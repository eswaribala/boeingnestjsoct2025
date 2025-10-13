import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './customers/address.entity';
import { AddressCreateDto } from './dto/address-create.dto';
import { CustomersService } from './customers.service';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private repo: Repository<Address>,
    private readonly customers: CustomersService,
  ) {}

  async list(customerId: number): Promise<Address[]> {
    return this.repo.find({
      where: { customer: { id: customerId } },
      order: { id: 'ASC' },
    });
  }

  async create(customerId: number, dto: AddressCreateDto): Promise<Address> {
    const customer = await this.customers.findOneOrThrow(customerId);
    const entity = this.repo.create({ ...dto, customer });
    return this.repo.save(entity);
  }

  async getOne(customerId: number, addressId: number): Promise<Address> {
    const addr = await this.repo.findOne({
      where: { id: addressId, customer: { id: customerId } },
    });
    if (!addr) {
      throw new NotFoundException(
        `Address ${addressId} not found for customer ${customerId}`,
      );
    }
    return addr;
  }
}
