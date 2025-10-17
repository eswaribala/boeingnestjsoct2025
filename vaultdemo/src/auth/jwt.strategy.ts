// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

type JwtPayload = {
  sub: string;
  preferred_username?: string;
  email?: string;
  aud?: string | string[];
  iss?: string;
  scope?: string;
  realm_access?: { roles: string[] };
  resource_access?: Record<string, { roles: string[] }>;
  // ...add what you read in your app
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const alg = (process.env.JWT_ALG ?? 'RS256').toUpperCase();

    // Common bits
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const ignoreExpiration = false;

    let options: StrategyOptions;

    if (alg === 'RS256') {
      // ----- RS256 via Keycloak JWKS -----
      const KC_BASE = must('KEYCLOAK_BASE_URL');
      const KC_REALM = must('KEYCLOAK_REALM');
      const JWKS_URI = `${KC_BASE}/realms/${KC_REALM}/protocol/openid-connect/certs`;
      const ISSUER = `${KC_BASE}/realms/${KC_REALM}`;
      const AUDIENCE = process.env.JWT_AUDIENCE ?? process.env.KEYCLOAK_CLIENT_ID; // usually your clientId

      options = {
        jwtFromRequest,
        ignoreExpiration,
        algorithms: ['RS256'],
        secretOrKeyProvider: jwksRsa.passportJwtSecret({
          jwksUri: JWKS_URI,
          cache: true,
          cacheMaxEntries: 5,
          cacheMaxAge: 10 * 60 * 1000, // 10 minutes
          rateLimit: true,
          jwksRequestsPerMinute: 10,
        }),
        issuer: ISSUER,
        //audience: AUDIENCE, // remove if your tokens don’t include aud
      } as StrategyOptions;
    } else {
      // ----- HS256 for local/dev -----
      const secret = must('JWT_SECRET');
      options = {
        jwtFromRequest,
        ignoreExpiration,
        algorithms: ['HS256'],
        secretOrKey: secret,
        issuer: process.env.JWT_ISSUER,   // optional
       //audience: process.env.JWT_AUDIENCE, // optional
      };
    }

    super({
      ...options,
      // small clock skew tolerance
      clockTolerance: 5,
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload) {
    if (!payload?.sub) throw new UnauthorizedException('Invalid token payload');
    // return whatever your app expects as the "user"
    return {
      userId: payload.sub,
      username: payload.preferred_username ?? payload.email,
      roles: payload.realm_access?.roles ?? [],
      raw: payload,
    };
  }
}

/** Env helper that throws early with a clear message */
function must(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}
