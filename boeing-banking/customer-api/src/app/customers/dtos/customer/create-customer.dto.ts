import { ApiProperty } from "@nestjs/swagger";
import { CreateAddressDto } from "../address/create-address.dto";
import {  IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";
export class CreateCustomerDto{
   @IsNotEmpty()
   @ApiProperty({ example: 123456 })
   accountNo: number;
   @IsNotEmpty()
   @IsString()
   @Matches(/^[A-Za-z]{2,25}$/, { message: 'First name must contain only letters' })
    @ApiProperty({ example: 'John' })
    firstName: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Doe' })
    @Matches(/^[A-Za-z]{2,25}$/, { message: 'Last name must contain only letters' })
    lastName: string
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;
    @IsNotEmpty()
    @Matches(/^\d{3}-\d{3}-\d{4}$/, { message: 'Phone number must be in the format XXX-XXX-XXXX' })
    @ApiProperty({ example: '123-456-7890' })
    phone: string;
    @IsNotEmpty()
    @ApiProperty({ example: {
        doorNo: '123',
        street: 'Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zip: '10001'
    } })
    address: CreateAddressDto;
}
