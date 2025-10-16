import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './v1/transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { AccountModule } from './account.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), forwardRef(() => AccountModule)],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsV1Module {}
