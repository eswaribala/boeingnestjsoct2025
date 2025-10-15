import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ResponseTransactionDto } from './dtos/reponse-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {}

  // Add your service methods here

  async findAll(): Promise<ResponseTransactionDto[]> {
    const transactions = await this.transactionRepository.find();
    const responseTransactions: ResponseTransactionDto[] = [];
    transactions.forEach((transaction) => {
      const responseTransaction = new ResponseTransactionDto();
      Object.assign(responseTransaction, transaction);
      responseTransactions.push(responseTransaction);
    });

    return responseTransactions;
  }

  async findOne(id: number): Promise<ResponseTransactionDto> {
    const transaction = await this.transactionRepository.findOne({ where: { transactionId:id } });
    const responseTransaction = new ResponseTransactionDto();
    Object.assign(responseTransaction, transaction);
    return responseTransaction;
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



  async remove(id: string): Promise<boolean> {
    const response = await this.transactionRepository.delete(id);
    if (response.affected === 0) {
      throw new Error(`Transaction with ID ${id} not found`);
    }else{
      console.log(`Transaction with ID ${id} deleted successfully`);
      return true;
    }
  }

}
