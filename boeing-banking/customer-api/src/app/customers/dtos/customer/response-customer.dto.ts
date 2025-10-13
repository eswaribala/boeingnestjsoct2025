import { AddressResponseDto } from "../address/response-address.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
export class CustomerResponseDto{
  @Expose()
  @ApiProperty()
  accountNo!: number
  @Expose()
  @ApiProperty()
  firstName!: string
  @Expose()
  @ApiProperty()
  lastName!: string
  @Expose()
  @ApiProperty()
  email!: string
  @Expose()
  @ApiProperty()
  phone!: string
  @Expose()
  @ApiProperty()
  address!: AddressResponseDto
}
