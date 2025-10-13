import { Customer } from "./customer.entity";
import { Gender } from "./gender.enum";
export class Individual extends Customer{

   gender: Gender;
   dob: Date;
}
