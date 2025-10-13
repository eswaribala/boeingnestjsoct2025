import { CompanyType } from "./company-type.enum";
import { Customer } from "./customer.entity";
export class Corporate extends Customer{

  companyType: CompanyType;
}
