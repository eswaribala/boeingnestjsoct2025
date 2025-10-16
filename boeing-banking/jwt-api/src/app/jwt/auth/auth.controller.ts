import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  //this route is protected by the local auth guard, goes to the auth service to validate the user
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {

    return this.auth.login(req.user);
  }
}
