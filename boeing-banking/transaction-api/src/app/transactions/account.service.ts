import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { Repository } from "typeorm/repository/Repository";
import { ResponseAccountDto } from "./dtos/response-account.dto";
import { CreateAccountDto } from "./dtos/create-account.dto";

@Injectable()
export class AccountService {


  constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {

  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<ResponseAccountDto> {
    const account = new Account();
    Object.assign(account, createAccountDto);
    await this.accountRepository.save(account);
    const responseAccountDto = new ResponseAccountDto();
    Object.assign(responseAccountDto, account);
    return responseAccountDto;
  }
  async getAccountById(accountNo: number): Promise<ResponseAccountDto> {
    const account = await this.accountRepository.findOne({ where: { accountNo } });
    const responseAccountDto = new ResponseAccountDto();
    Object.assign(responseAccountDto, account);
    return responseAccountDto;
  }
  async getAllAccounts(): Promise<ResponseAccountDto[]> {
    const accounts = await this.accountRepository.find();
    const responseAccountDtos: ResponseAccountDto[] = [];
    accounts.forEach((account) => {
      const responseAccountDto = new ResponseAccountDto();
      Object.assign(responseAccountDto, account);
      responseAccountDtos.push(responseAccountDto);
    });
    return responseAccountDtos;
  }
}
