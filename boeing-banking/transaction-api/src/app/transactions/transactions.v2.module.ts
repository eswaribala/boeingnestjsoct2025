import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './v2/transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Transaction } from './entities/transaction.entity';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction,Account])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsV2Module {}
