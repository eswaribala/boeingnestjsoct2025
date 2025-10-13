import { Injectable } from '@nestjs/common';
import { CustomerCreateDto } from './dtos/create-customer.dto';
import { Customer } from './models/customer';
import { CustomerResponseDto } from './dtos/customer-response.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';
@Injectable()
export class CustomersService {
  private customers: Customer[] = [];

  create(dto: CustomerCreateDto) {
    const customer = new Customer();
    Object.assign(customer, dto);
   // Object.assign(customer.address, dto.addressCreateDto);
    customer.id = this.customers.length + 1;
   // customer.address.id = this.customers.length + 1;
     const c: CustomerResponseDto = {
    id: this.customers.length + 1, // simple unique id generation
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    phone: dto.phone,
    address: dto.address, // or map to your shape

  };
  this.customers.push(customer);
  return c; // <-- return value



  }
  findAll(): CustomerResponseDto[] {
    return this.customers.map(customer => {
      const c: CustomerResponseDto = {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: {
          id: customer.address.id,
          doorNumber: customer.address.doorNumber,
          street: customer.address.street,
          city: customer.address.city,
          zip: customer.address.zip,
          state: customer.address.state,
        }, // or map to your shape

      };
      return c;
    });


  }
  findOne(id: number): CustomerResponseDto{
    const customer = this.customers.find(c => c.id === id);

   console.log(customer);
    const c: CustomerResponseDto = {
    id: this.customers.length + 1, // simple unique id generation
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address, // or map to your shape

  };
  return c;

  }
  remove(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
  }
  update(id: number, dto: Partial<Customer>): CustomerResponseDto {
    const customer = this.findOne(id);
    Object.assign(customer, dto);
    const c: CustomerResponseDto = {
    id: this.customers.length + 1, // simple unique id generation
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address, // or map to your shape

  };
  return c;
  }
  list(page: number, limit: number, sort?: 'asc' | 'desc'): Customer[] {
    const sortedCustomers = [...this.customers];
    if (sort) {
      sortedCustomers.sort((a, b) => {
        if (sort === 'asc') {
          return a.firstName.localeCompare(b.firstName);
        } else {
          return b.firstName.localeCompare(a.firstName);
        }
      });
    }
   // const start = (page - 1) * limit;
    console.log(this.customers);
    return this.customers
}
}
