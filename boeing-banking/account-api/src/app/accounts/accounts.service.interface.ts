import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { ResponseAccountDto } from './dtos/response-account.dto';
export interface IAccountsService {
  findAll(): Promise<ResponseAccountDto[]>;
  findOne(id: string): Promise<ResponseAccountDto>;
  create(data: CreateAccountDto): Promise<ResponseAccountDto>;
  update(id: string, data: UpdateAccountDto): Promise<ResponseAccountDto>;
  delete(id: string): Promise<boolean>;
}
