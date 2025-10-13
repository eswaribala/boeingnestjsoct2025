import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class AddressCreateDto {
  @ApiProperty() @IsNotEmpty() @Length(1, 20) doorNumber!: string;
  @ApiProperty() @IsNotEmpty() @Length(1, 100) street!: string;
  @ApiProperty() @IsNotEmpty() @Length(1, 60) city!: string;
  @ApiProperty() @IsNotEmpty() @Length(1, 60) state!: string;
  @ApiProperty() @IsNotEmpty() @Length(1, 12) zip!: string;
}
