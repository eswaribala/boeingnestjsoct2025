import { Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerResponseDto } from './dtos/customer/response-customer.dto';
import { CreateCustomerDto } from './dtos/customer/create-customer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { Body, Get, Param } from '@nestjs/common';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {


  //DI
  private customersService: CustomersService;

  constructor(customersService: CustomersService) {
    this.customersService = customersService;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'The customer has been successfully created.', type: CustomerResponseDto })
  createCustomer(@Body() createCustomerDto: CreateCustomerDto): CustomerResponseDto {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers', type: [CustomerResponseDto] })
  getAllCustomers(): CustomerResponseDto[] {
    return this.customersService.getAllCustomers();
  }

  @Get(':accountNo')
  @ApiOperation({ summary: 'Get a customer by account number' })
  @ApiResponse({ status: 200, description: 'The customer has been successfully retrieved.', type: CustomerResponseDto })
  getCustomerByAccountNo(@Param('accountNo') accountNo: number): CustomerResponseDto {
    return this.customersService.getCustomerByAccountNo(accountNo);
  }

}
