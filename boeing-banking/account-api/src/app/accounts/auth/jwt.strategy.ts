import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      // HS256 only
      secretOrKey: process.env.JWT_SECRET, // MUST equal jwt-api’s signing secret
      // keep these ONLY if jwt-api signs with them (your token does)
      issuer: process.env.JWT_ISSUER,      // "boeing-banking.jwt-api"
      audience: process.env.JWT_AUDIENCE,  // "boeing-banking.account-api"
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, roles: payload.roles ?? [] };
  }
}
