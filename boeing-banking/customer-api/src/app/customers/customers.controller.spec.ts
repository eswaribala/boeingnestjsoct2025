/*
import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/customer/create-customer.dto';
import { UpdateCustomerDto } from './dtos/customer/update-customer.dto';
import { CustomerResponseDto } from './dtos/customer/response-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomer: CustomerResponseDto = {
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
  };

  const mockCustomersService = {
    createCustomer: jest.fn().mockReturnValue(mockCustomer),
    getAllCustomers: jest.fn().mockReturnValue([mockCustomer]),
    getCustomerByAccountNo: jest.fn().mockReturnValue(mockCustomer),
    updateCustomer: jest.fn().mockReturnValue({ ...mockCustomer, firstName: 'Updated' }),
    deleteCustomer: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', () => {
    const dto: CreateCustomerDto = {
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
    };

    const result = controller.createCustomer(dto);
    expect(service.createCustomer).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCustomer);
  });

  it('should return all customers', () => {
    const result = controller.getAllCustomers();
    expect(service.getAllCustomers).toHaveBeenCalled();
    expect(result).toEqual([mockCustomer]);
  });

  it('should return a customer by account number', () => {
    const accountNo = 123456;
    const result = controller.getCustomerByAccountNo(accountNo);
    expect(service.getCustomerByAccountNo).toHaveBeenCalledWith(accountNo);
    expect(result).toEqual(mockCustomer);
  });

  it('should update a customer', () => {
    const accountNo = 123456;
    const dto: UpdateCustomerDto = { firstName: 'Updated' } as any;
    const result = controller.updateCustomer(accountNo, dto);
    expect(service.updateCustomer).toHaveBeenCalledWith(accountNo, dto);
    expect(result.firstName).toEqual('Updated');
  });

  it('should delete a customer successfully', () => {
    const result = controller.deleteCustomer(123456);
    expect(service.deleteCustomer).toHaveBeenCalledWith(123456);
    expect(result).toEqual('Customer deleted successfully');
  });

  it('should return "Customer not found" when delete fails', () => {
    jest.spyOn(service, 'deleteCustomer').mockReturnValueOnce(false);
    const result = controller.deleteCustomer(9999);
    expect(result).toEqual('Customer not found');
  });
});
*/
