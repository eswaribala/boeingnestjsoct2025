import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/customer/create-customer.dto';
import { CustomerResponseDto } from './dtos/customer/response-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {

  customers: Customer[]=[];

  createCustomer(createCustomerDto:CreateCustomerDto): CustomerResponseDto{
    const customer=new Customer();
    //dto to entity
    Object.assign(customer,createCustomerDto);
    this.customers.push(customer);
    //entity to dto
    const customerResponseDto=new CustomerResponseDto();
    Object.assign(customerResponseDto,customer);
    return customerResponseDto;

  }
  getAllCustomers(): CustomerResponseDto[]{
    const customerResponseDtos: CustomerResponseDto[]=[];
    for(const customer of this.customers){
      const customerResponseDto=new CustomerResponseDto();
      //entity to dto
      Object.assign(customerResponseDto,customer);
      customerResponseDtos.push(customerResponseDto);
    }
    return customerResponseDtos;
  }

  getCustomerByAccountNo(accountNo:number): CustomerResponseDto{
    const customer=this.customers.find(c=>c.accountNo===accountNo);
    if(!customer) throw new Error('Customer not found');
    const customerResponseDto=new CustomerResponseDto();
    Object.assign(customerResponseDto,customer);
    return customerResponseDto;
  }
}
