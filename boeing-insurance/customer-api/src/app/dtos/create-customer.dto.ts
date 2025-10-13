import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressCreateDto } from './address-create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class CustomerCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123-456-7890' })
  phone: string;
  @ApiProperty({ type: AddressCreateDto })
  @ValidateNested()
  @Type(() => AddressCreateDto)
  address: AddressCreateDto;

}
