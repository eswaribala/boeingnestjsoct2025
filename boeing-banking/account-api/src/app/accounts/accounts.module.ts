import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema}])],
  providers: [{
    provide: 'IAccountsService',
    useClass: AccountsService
  }],
  controllers: [AccountsController]
})
export class AccountsModule {}
