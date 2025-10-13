import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/customer/create-customer.dto';
import { CustomerResponseDto } from './dtos/customer/response-customer.dto';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dtos/customer/update-customer.dto';

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

  updateCustomer(accountNo:number,updateCustomerDto:UpdateCustomerDto): CustomerResponseDto{
    const customerIndex=this.customers.findIndex(c=>c.accountNo===accountNo);
    if(customerIndex===-1) throw new Error('Customer not found');
    const customer=this.customers[customerIndex];
    customer.email=updateCustomerDto.email;
    customer.phone=updateCustomerDto.phone;
    if(updateCustomerDto.address){
      customer.address.doorNo=updateCustomerDto.address.doorNo;
      customer.address.street=updateCustomerDto.address.street;
      customer.address.city=updateCustomerDto.address.city;
      customer.address.state=updateCustomerDto.address.state;
      customer.address.country=updateCustomerDto.address.country;
      customer.address.zip=updateCustomerDto.address.zip;
    }
    const customerResponseDto=new CustomerResponseDto();
    Object.assign(customerResponseDto,customer);
    return customerResponseDto;
  }

  deleteCustomer(accountNo:number): boolean{
    let customerStatus:boolean;
    customerStatus=false;
    const customerIndex=this.customers.findIndex(c=>c.accountNo===accountNo);
    if(customerIndex===-1) throw new Error('Customer not found');
    this.customers.splice(customerIndex,1);
    customerStatus=true;
    return customerStatus;
  }
}
