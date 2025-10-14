import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IAccountsService } from '../accounts.service.interface';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { Body, Post, Get, Param, Patch, Delete, Inject } from '@nestjs/common';
@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsController {

   constructor(
    @Inject('IAccountsService') private readonly accountsService: IAccountsService, // <-- token!
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.delete(id);
  }



}
