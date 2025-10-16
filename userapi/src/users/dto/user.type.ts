import { Field, InputType } from "@nestjs/graphql";
import { ID, ObjectType,Int} from "@nestjs/graphql";
import { IsNotEmpty, Matches } from "class-validator";

@ObjectType()
export class User{
   @Field(()=>ID) userId:number;
   @Field(()=>String) firstName:string;
   @Field(()=>String) lastName:string;
   @Field(()=>String) email:string;
   @Field(()=>String) password:string;
   @Field(()=>BigInt) contactNumber:number;

}

@InputType()
export class CreateUserInput{
    @Field(()=>String) 
    @IsNotEmpty() 
    @Matches(/^[a-zA-Z]+$/, { message: 'First name must contain only letters' }) 
    firstName:string;
    @Field(()=>String) 
    @IsNotEmpty() 
    @Matches(/^[a-zA-Z]+$/, { message: 'Last name must contain only letters' }) 
    lastName:string;
    @Field(()=>String) 
    @IsNotEmpty() 
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email must be a valid email address' }) 
    email:string;
    @Field(()=>String) 
    @IsNotEmpty() 
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password must be at least 8 characters long and contain both letters and numbers' }) 
    password:string;
    @Field(()=>BigInt) 
    @IsNotEmpty() 
    @Matches(/^\d{10}$/, { message: 'Contact number must be a valid 10-digit number' }) 
    contactNumber:number;
}

@InputType()
export class UpdateUserInput{
    @Field(()=>ID) 
    @IsNotEmpty() 
    userId:number;
    @Field(()=>String) 
    @IsNotEmpty()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email must be a valid email address' }) 
    email:string;
    @Field(()=>String) 
    @IsNotEmpty() 
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password must be at least 8 characters long and contain both letters and numbers' }) 
    password:string;
    @Field(()=>BigInt) @IsNotEmpty() @Matches(/^\d{10}$/, { message: 'Contact number must be a valid 10-digit number' }) 
    contactNumber:number;
}