import { ApiProperty } from "@nestjs/swagger";
import { CreateAddressDto } from "../address/create-address.dto";
import {  IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
export class CreateCustomerDto{
   @IsNotEmpty()
   @ApiProperty({ example: 123456 })
   accountNo: number;
   @IsNotEmpty()
   @IsString()
    @ApiProperty({ example: 'John' })
    firstName: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Doe' })
    lastName: string
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;
    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({ example: '123-456-7890' })
    phone: string;
    address: CreateAddressDto;
}
