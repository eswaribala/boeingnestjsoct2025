import { Injectable } from '@nestjs/common';
import { CreateUserInput, User } from './dto/user.type';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
    users:User[]=[];
    create(user:CreateUserInput):User{
        const newUser:User={
            userId: faker.number.int({min:1,max:1000}),
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

      
}
