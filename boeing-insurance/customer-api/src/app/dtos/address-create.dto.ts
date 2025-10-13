import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class AddressCreateDto {

  id?: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  doorNumber?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Main St' })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Springfield' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'IL' })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '62701' })
  zip: string;
}
