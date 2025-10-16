import { forwardRef, Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './v2/transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { AccountModule } from './account.module';



@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),forwardRef(() => AccountModule)],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsV2Module {}
