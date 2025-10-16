import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserService } from '../jwt.user.service';


@Injectable()
export class AuthService {
  constructor(private users: JwtUserService, private jwt: JwtService) {}
  async validateUser(loginUserDto: any) {
    console.log('AuthService validateUser', loginUserDto);
    return this.users.validateUser(loginUserDto);
  }

  async login(user: any) {
    console.log('AuthService login', user);
      const common = {
  expiresIn: '1h',
  issuer: process.env.JWT_ISSUER,     // e.g. "boeing-banking.jwt-api"
  audience: process.env.JWT_AUDIENCE, // e.g. "boeing-banking.account-api"
};
    const payload = { sub: user.email, email: user.email, roles: user.roles ?? [] };
    console.log('AuthService payload', payload);
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, token_type: 'Bearer', expires_in: process.env.JWT_EXPIRES ?? '3600s' };
  }
}
