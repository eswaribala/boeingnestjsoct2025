import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/jwt-api/.env', '.env'], // adjust to your layout
    })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
