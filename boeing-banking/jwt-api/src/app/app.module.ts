import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './jwt/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/jwt-api/.env', '.env'], // adjust to your layout
    }),MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://localhost:27017/boeing-banking')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
