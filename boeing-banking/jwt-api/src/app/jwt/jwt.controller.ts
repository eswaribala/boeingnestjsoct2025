import { Body, Controller, Post } from '@nestjs/common';
import { JwtUserService } from './jwt.user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class JWTUsersController {
  constructor(private users: JwtUserService) {}
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }
}
