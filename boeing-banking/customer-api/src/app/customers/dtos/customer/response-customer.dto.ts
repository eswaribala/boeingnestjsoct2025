import { AddressResponseDto } from "../address/response-address.dto";
export class CustomerResponseDto{
  accountNo: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: AddressResponseDto
}
