import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ResponseTransactionDto } from './dtos/reponse-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { forwardRef } from '@nestjs/common';
@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,  @Inject(forwardRef(() => AccountService))private readonly accountService:AccountService) {}

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

    console.log('Creating transaction:', transaction);

    const responseAccountDto = await this.accountService.getAccountById(createTransactionDto.account);
    if (!responseAccountDto) {
      throw new Error(`Account with accountNo ${createTransactionDto.account} not found`);
    }

    const account = new Account();
    Object.assign(account, responseAccountDto);
    // Link the transaction to the account

    transaction.account = account;
    if (!account) {
      throw new Error(`Account with accountNo ${createTransactionDto.account} not found`);
    }

    const transactionResponse = await this.transactionRepository.save(transaction);
    const responseTransactionDto = new ResponseTransactionDto();
    Object.assign(responseTransactionDto, transactionResponse);
    console.log('Created transaction:', responseTransactionDto);
    return responseTransactionDto;
  }



  async remove(id: number): Promise<boolean> {
    const response = await this.transactionRepository.delete(id);
    if (response.affected === 0) {
      throw new Error(`Transaction with ID ${id} not found`);
    }else{
      console.log(`Transaction with ID ${id} deleted successfully`);
      return true;
    }
  }

}
