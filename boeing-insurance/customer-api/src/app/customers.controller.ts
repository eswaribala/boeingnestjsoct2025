import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer';
import { CustomerCreateDto } from './dtos/create-customer.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListCustomersQuery } from './dtos/list-customers.query';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CustomerResponseDto } from './dtos/customer-response.dto';
@ApiTags('customers')
@Controller('customers')
export class CustomersController {

  constructor(private readonly customersService: CustomersService) {
    this.customersService = customersService;
  }
  @Post()
  @ApiOperation({ summary: 'Create customer' })
  @ApiCreatedResponse({ description: 'Customer created' })
  async create(@Body() dto: CustomerCreateDto): Promise<CustomerResponseDto> {
    const created = await this.customersService.create(dto);
    return created;
  }
  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiCreatedResponse({ description: 'List of customers' })
  findAll(): CustomerResponseDto[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  @ApiOkResponse({ description: 'Customer' })
  findOne(@Param('id') id: number): Customer {
    return this.customersService.findOne(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer by id' })
  @ApiOkResponse({ description: 'Customer deleted' })
  remove(@Param('id') id: number): void {
    this.customersService.remove(id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  @ApiOkResponse({ description: 'Customer updated' })
  update(@Param('id') id: number, @Body() dto: CustomerCreateDto): CustomerResponseDto {
    return this.customersService.update(id, dto);
  }
  /*
  @Get("/list")
  @ApiOperation({ summary: 'List customers (paginated)' })
  @ApiOkResponse({ description: 'List with pagination meta' })
  list(@Query() q: ListCustomersQuery): Customer[] {
    return this.customersService.list(q.page, q.limit, q.sortOrder as 'asc' | 'desc');
  }
*/
}
