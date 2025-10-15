import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './v1/transactions.controller';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsV1Module {}
