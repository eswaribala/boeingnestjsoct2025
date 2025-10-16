import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../transactions.service';
import { Body, Post,Get,Delete } from '@nestjs/common';
import { ResponseTransactionDto } from '../dtos/reponse-transaction.dto';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
@ApiTags('transactions')
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {


  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<ResponseTransactionDto> {
    console.log('Received CreateTransactionDto:', createTransactionDto);
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAllTransactions(): Promise<ResponseTransactionDto[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findTransactionById(@Param('id') id: number): Promise<ResponseTransactionDto> {
    return this.transactionService.findOne(id);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: number): Promise<boolean> {
    return this.transactionService.remove(id);
  }

}
