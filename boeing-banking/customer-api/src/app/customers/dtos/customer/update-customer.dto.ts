import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from '../address/update-address.dto';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
export class UpdateCustomerDto {

      @IsNotEmpty()
      @IsEmail()
      @ApiProperty({ example: 'john.doe@example.com' })
      email: string;
      @IsNotEmpty()
      @Matches(/^\d{3}-\d{3}-\d{4}$/, { message: 'Phone number must be in the format XXX-XXX-XXXX' })
      @ApiProperty({ example: '123-456-7890' })
      phone: string;
      address: UpdateAddressDto;
}
