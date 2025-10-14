import { Injectable } from '@nestjs/common';
import { ResponseAccountDto } from './dtos/response-account.dto';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { IAccountsService } from './accounts.service.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './entities/account.entity';
import { Model } from 'mongoose';
import { AccountType } from './dtos/create-account.dto';
@Injectable()
export class AccountsService implements IAccountsService {


  constructor(@InjectModel(Account.name) private readonly accountModel : Model<AccountDocument>) {

  }

  async findAll(): Promise<ResponseAccountDto[]> {
    // Implementation here
    const accounts=await this.accountModel.find().exec();
    return accounts.map((doc)=>{
      const responseAccountDto = new ResponseAccountDto();
        responseAccountDto._id = doc._id.toString();
        responseAccountDto.accountType = AccountType[doc.accountType];
        responseAccountDto.accountNo = doc.accountNo;
        responseAccountDto.runningTotal = doc.runningTotal;
        return responseAccountDto;
      });

  }

  async findOne(id: string): Promise<ResponseAccountDto> {
    // Implementation here
    const doc = await this.accountModel.findById(id).exec();
    const responseAccountDto = new ResponseAccountDto();
    responseAccountDto._id = doc._id.toString();
    responseAccountDto.accountType = AccountType[doc.accountType];
    responseAccountDto.accountNo = doc.accountNo;
    responseAccountDto.runningTotal = doc.runningTotal;
    return responseAccountDto;
  }



  async create(data: CreateAccountDto): Promise<ResponseAccountDto> {
    // Implementation here
    const account = new Account();
    Object.assign(account, data);
    const createdAccount = new this.accountModel(account);
    const res = await createdAccount.save();
    const responseAccountDto = new ResponseAccountDto();
    responseAccountDto._id = (await res)._id.toString();
    responseAccountDto.accountType = AccountType[(await res).accountType];
    responseAccountDto.accountNo = (await res).accountNo;
    responseAccountDto.runningTotal = (await res).runningTotal;
    return responseAccountDto;

  }

  async update(id: string, data: UpdateAccountDto): Promise<ResponseAccountDto> {
    // Implementation here

    const updatedAccount =   await this.accountModel.findByIdAndUpdate(id, data, { new: true }).exec();
    const responseAccountDto = new ResponseAccountDto();
    responseAccountDto._id = updatedAccount._id.toString();
    responseAccountDto.accountType = AccountType[updatedAccount.accountType];
    responseAccountDto.accountNo = updatedAccount.accountNo;
    responseAccountDto.runningTotal = updatedAccount.runningTotal;
    return responseAccountDto;
  }

  async delete(id: string): Promise<boolean> {
    // Implementation here
    const doc = await this.accountModel.findByIdAndDelete(id).exec();
    return doc !== null;
  }

}
