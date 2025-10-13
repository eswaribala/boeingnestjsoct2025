import { ApiProperty } from '@nestjs/swagger';

import { Expose, Type } from 'class-transformer';
import { AddressResponseDto } from './address-response.dto';

export class CustomerResponseDto {
  @Expose() @ApiProperty() id!: number;
  @Expose() @ApiProperty() firstName!: string;
  @Expose() @ApiProperty() lastName!: string;
  @Expose() @ApiProperty() email!: string;
  @Expose() @ApiProperty() phone!: string;
   // Map internal `addressCreateDto` → API `address`
  @Expose()
  @ApiProperty() address!: AddressResponseDto;

}
