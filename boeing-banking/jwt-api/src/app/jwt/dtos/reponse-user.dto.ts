import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class ResponseUserDto {
  @Expose()
  @ApiProperty()
  _id: string;
  @Expose()
  @ApiProperty()
  email: string;
  @Expose()
  @ApiProperty()
  roles: string[];
  @Expose()
  @ApiProperty()
  name: string;
}
