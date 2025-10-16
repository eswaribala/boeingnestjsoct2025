import { Module } from '@nestjs/common';
import { User, UserSchema } from './entities/user.entity';
import { JwtUserService } from './jwt.user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTUsersController } from './jwt.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [JWTUsersController],
  providers: [JwtUserService],
  exports: [JwtUserService],
})
export class JwtUserModule {}
