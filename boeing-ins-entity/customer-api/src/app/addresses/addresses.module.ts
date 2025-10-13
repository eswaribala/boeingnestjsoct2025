// addresses/addresses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../customers/address.entity';
import { AddressesService } from '../address.service';
import { AddressesController } from '../addresses.controller';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), CustomersModule],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
