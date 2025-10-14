import { Injectable } from '@nestjs/common';
import { ResponseAccountDto } from './dtos/response-account.dto';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { IAccountsService } from './accounts.service.interface';

@Injectable()
export class AccountsService implements IAccountsService {

  

  findAll(): Promise<ResponseAccountDto[]> {
    // Implementation here
  }

  findOne(id: string): Promise<ResponseAccountDto> {
    // Implementation here
  }

  create(data: CreateAccountDto): Promise<ResponseAccountDto> {
    // Implementation here

  }

  update(id: string, data: UpdateAccountDto): Promise<ResponseAccountDto> {
    // Implementation here
  }

  delete(id: string): Promise<boolean> {
    // Implementation here
  }

}
