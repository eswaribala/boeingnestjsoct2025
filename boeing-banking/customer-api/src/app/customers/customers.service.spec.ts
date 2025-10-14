import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from './dtos/customer/update-customer.dto';
import { describe, expect, it ,beforeEach} from '@jest/globals';

describe('CustomersService', () => {
  let service: CustomersService;

  const makeCreateDto = (overrides: Partial<CreateCustomerDto> = {}): CreateCustomerDto => ({
    accountNo: 123456,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: {
      doorNo: '123',
      street: 'Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10001',
    },
    ...overrides,
  });

  beforeEach(() => {
    service = new CustomersService();
  });

  it('createCustomer() should create and return a response dto', () => {
    const dto = makeCreateDto();
    const resp = service.createCustomer(dto);

    expect(resp).toEqual({
      accountNo: 123456,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: {
        doorNo: '123',
        street: 'Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001',
      },
    });

    // also verify it was stored
    expect(service['customers'].length).toBe(1);
  });

  it('getAllCustomers() should return all customers', () => {
    service.createCustomer(makeCreateDto({ accountNo: 1, firstName: 'A' }));
    service.createCustomer(makeCreateDto({ accountNo: 2, firstName: 'B' }));

    const list = service.getAllCustomers();
    expect(list).toHaveLength(2);
    expect(list.map(c => c.accountNo)).toEqual([1, 2]);
  });

  it('getCustomerByAccountNo() should return a single customer', () => {
    service.createCustomer(makeCreateDto({ accountNo: 42, firstName: 'Zoe' }));
    const got = service.getCustomerByAccountNo(42);

    expect(got.firstName).toBe('Zoe');
    expect(got.accountNo).toBe(42);
  });

  it('getCustomerByAccountNo() should throw when not found', () => {
    expect(() => service.getCustomerByAccountNo(999)).toThrow('Customer not found');
  });

  it('updateCustomer() should update email, phone and address fields', () => {
    service.createCustomer(makeCreateDto({ accountNo: 7 }));

    const update: UpdateCustomerDto = {
      email: 'new.mail@example.com',
      phone: '999-000-1111',
      address: {
        doorNo: '9',
        street: 'Elm St',
        city: 'Gotham',
        state: 'NJ',
        country: 'USA',
        zip: '07001',
      },
    };

    const updated = service.updateCustomer(7, update);

    expect(updated.email).toBe('new.mail@example.com');
    expect(updated.phone).toBe('999-000-1111');
    expect(updated.address).toEqual({
      doorNo: '9',
      street: 'Elm St',
      city: 'Gotham',
      state: 'NJ',
      country: 'USA',
      zip: '07001',
    });
  });

  it('updateCustomer() should throw when not found', () => {
    const update: UpdateCustomerDto = { email: 'x@y.z', phone: '1', address: undefined as any };
    expect(() => service.updateCustomer(404, update)).toThrow('Customer not found');
  });

  it('deleteCustomer() should remove a customer and return true', () => {
    service.createCustomer(makeCreateDto({ accountNo: 100 }));
    const ok = service.deleteCustomer(100);

    expect(ok).toBe(true);
    expect(service['customers'].some(c => c.accountNo === 100)).toBe(false);
  });

  it('deleteCustomer() should throw when not found', () => {
    expect(() => service.deleteCustomer(123)).toThrow('Customer not found');
  });
});
