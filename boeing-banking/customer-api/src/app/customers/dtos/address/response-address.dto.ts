import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer/types/decorators/expose.decorator";

export  class AddressResponseDto{
  @Expose()
  @ApiProperty()
  doorNo!: string;
  @Expose()
  @ApiProperty()
  street!: string;
  @Expose()
  @ApiProperty()
  city!: string;
  @Expose()
  @ApiProperty()
  state!: string;
  @Expose()
  @ApiProperty()
  country!: string;
  @Expose()
  @ApiProperty()
  zip!: string;
}
