import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User } from './dto/user.type';
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

    findAll():User[]{
        return this.users;
    }
    findOne(id:number):User | undefined {
        return this.users.find(user=>user.userId===id);
    }
    update(input:UpdateUserInput):User | undefined {
        const user=this.findOne(input.userId);
        if(!user)return undefined;
        Object.assign(user,input);
        return user;
    }
    remove(id:number):User | undefined {
        const user=this.findOne(id);
        this.users=this.users.filter(user=>user.userId!==id);
        return user;
    }
}
