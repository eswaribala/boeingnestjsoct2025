import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AddressResponseDto {
  @Expose() @ApiProperty() id?: number;
  @Expose() @ApiProperty() doorNumber?: string;
  @Expose() @ApiProperty() street!: string;
  @Expose() @ApiProperty() city!: string;
  @Expose() @ApiProperty() state!: string;
  @Expose() @ApiProperty() zip!: string;


}
