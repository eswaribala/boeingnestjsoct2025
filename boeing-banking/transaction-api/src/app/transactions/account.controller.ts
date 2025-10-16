import { Controller, Get, Body,Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dtos/create-account.dto";
import { ResponseAccountDto } from "./dtos/response-account.dto";

@ApiTags('Accounts')
@Controller({path:'accounts', version:'1'})
export  class AccountController {

  constructor(private readonly accountService: AccountService) {}

  // Define your endpoints here
  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<ResponseAccountDto> {
    return this.accountService.createAccount(createAccountDto);
  }
  @Get(':accountNo')
  async getAccountById(@Param('accountNo') accountNo: number): Promise<ResponseAccountDto> {
    return this.accountService.getAccountById(accountNo);
  }
  @Get()
  async getAllAccounts(): Promise<ResponseAccountDto[]> {
    return this.accountService.getAllAccounts();
  }
}
