import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../../dtos/login.dto';
import { ResponseUserDto } from '../../dtos/reponse-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // POST body {email, password}
  }
  async validate(email: string, password: string)  {
    const loginDto = new LoginDto();
    loginDto.email = email;
    loginDto.password = password;
    console.log('LocalStrategy validate', loginDto);
    const user = await this.authService.validateUser(loginDto);
    console.log('LocalStrategy user', user);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    /*
    const responseUserDto = new ResponseUserDto();
    responseUserDto._id = user._id;
    responseUserDto.email = user.email;
    responseUserDto.roles = user.roles;
    responseUserDto.name = user.name;
    responseUserDto.roles = user.roles;
    return responseUserDto;
    */
    return user;
  }
}
