import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AccountsModule,MongooseModule.forRoot(process.env.MONGO_URI||'mongodb://mongodb:27017/accountsdb2025')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

