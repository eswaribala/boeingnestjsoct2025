import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ResponseTransactionDto } from './dtos/reponse-transaction.dto';

@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {}

  // Add your service methods here

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  findOne(id: string): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ id });
  }

  async create(createTransactionDto: CreateTransactionDto): Promise<ResponseTransactionDto> {
    const transaction = new Transaction();
    Object.assign(transaction, createTransactionDto);

    const transactionResponse = this.transactionRepository.create(transaction);
    await this.transactionRepository.save(transactionResponse);
    const responseTransactionDto = new ResponseTransactionDto();
    Object.assign(responseTransactionDto, transactionResponse);
    return responseTransactionDto;

  }

  update(id: string, transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save({ ...transaction, id });
  }

  remove(id: string): Promise<void> {
    return this.transactionRepository.delete(id).then(() => {});
  }
}
