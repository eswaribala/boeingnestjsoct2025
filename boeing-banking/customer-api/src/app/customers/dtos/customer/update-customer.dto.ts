import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from '../address/update-address.dto';
import { IsEmail, IsNotEmpty,  Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateCustomerDto {

      @IsNotEmpty()
      @IsEmail()
      @ApiProperty({ example: 'john.doe@example.com' })
      email: string;
      @IsNotEmpty()
      @Matches(/^\d{3}-\d{3}-\d{4}$/, { message: 'Phone number must be in the format XXX-XXX-XXXX' })
      @ApiProperty({ example: '123-456-7890' })
      phone: string;
   @ApiProperty({ example: {
        doorNo: '123',
        street: 'Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001'
    } })
    @ValidateNested()
    @Type(() => UpdateAddressDto)
      address: UpdateAddressDto;
}
