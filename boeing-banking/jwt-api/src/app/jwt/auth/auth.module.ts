import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { getPrivateKey } from './keys.util';

import { AuthController } from './auth.controller';
import { LocalStrategy } from './stategies/local.strategy';
import { JwtStrategy } from './stategies/jwt.strategy';
import { JwtUserModule } from '../jwt.module';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtUserModule,
    PassportModule,
      JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const alg = (cfg.get<string>('JWT_ALG') || 'HS256').toUpperCase();

        if (alg === 'RS256') {
          // Will throw a clear error if key is truly missing
          const privateKey = getPrivateKey();
          return {
            privateKey,
            signOptions: {
              algorithm: 'RS256',
              expiresIn: cfg.get('JWT_EXPIRES') || '1h',
              issuer: cfg.get('JWT_ISSUER'),
              audience: cfg.get('JWT_AUDIENCE'),
            },
          };
        }

        // HS256 fallback (no files required)
        return {
          secret: cfg.get<string>('JWT_SECRET') || 'dev-secret',
          signOptions: {
            algorithm: 'HS256',
            expiresIn: cfg.get('JWT_EXPIRES') || '1h',
            issuer: cfg.get('JWT_ISSUER'),
            audience: cfg.get('JWT_AUDIENCE'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
