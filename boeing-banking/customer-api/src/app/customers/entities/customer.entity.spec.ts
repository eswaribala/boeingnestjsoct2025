import { Customer } from './customer.entity';
import { describe, expect, it } from '@jest/globals';
import { Address } from './address.entity';

describe('Customer Entity', () => {
  it('should create a Customer instance with correct properties', () => {
    const address: Address = {
      doorNo: '123',
      street: 'Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10001',
    };

    const customer: Customer = {
      accountNo: 123456,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address,
    };

    // ✅ Basic property checks
    expect(customer).toBeDefined();
    expect(customer.firstName).toBe('John');
    expect(customer.address.city).toBe('New York');

    // ✅ Deep equality check
    expect(customer).toEqual({
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
  });
});
