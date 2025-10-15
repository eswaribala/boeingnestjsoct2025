import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from '../transactions.service';
import { Body, Post,Get,Delete } from '@nestjs/common';
import { ResponseTransactionDto } from '../dtos/reponse-transaction.dto';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
@ApiTags('transactions')
@Controller({ path: 'customers', version: '1' })
export class TransactionsController {

  private readonly transactionService:TransactionsService;
  constructor(transactionService: TransactionsService) {
    this.transactionService = transactionService;
  }

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<ResponseTransactionDto> {
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
