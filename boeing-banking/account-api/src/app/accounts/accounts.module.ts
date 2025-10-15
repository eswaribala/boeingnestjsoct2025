import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './v1/accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { SavingsAccountSchema } from './entities/savings-account.entity';
import { CurrentAccountSchema} from './entities/current-account.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Account.name, useFactory: () => {
    const schema = AccountSchema;
    schema.discriminator('SAVINGS',  SavingsAccountSchema);
    schema.discriminator('CURRENT',  CurrentAccountSchema);
    return schema;
  }}])],
  providers: [{
    provide: 'IAccountsService',
    useClass: AccountsService
  }],
  controllers: [AccountsController]
})
export class AccountsModule {}
/*
@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),MongooseModule.forFeature([{ name: 'SAVINGS', schema: SavingsAccountSchema }]),MongooseModule.forFeature([{ name: 'CURRENT', schema: CurrentAccountSchema }])  ],
  providers: [{
    provide: 'IAccountsService',
    useClass: AccountsService
  }],
  controllers: [AccountsController]
})
export class AccountsModule {}
*/
