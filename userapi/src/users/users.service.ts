import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User } from './dto/user.type';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
    users:User[]=[];
    create(user:CreateUserInput):User{
        const newUser:User={
            userId: randomUUID(),
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    findAll():User[]{
        return this.users;
    }
    findOne(id:string):User | undefined  {
        console.log(typeof id);
        this.users.forEach(user => {
            console.log(typeof user.userId);
           console.log(user.userId);
        });

        return this.users.find(user=>user.userId===id);
    }
    update(input:UpdateUserInput):User | undefined {
        const user=this.findOne(input.userId);
        if(!user)return undefined;
        Object.assign(user,input);
        return user;
    }
    remove(id:string):User | undefined {
        const user=this.findOne(id);
        this.users=this.users.filter(user=>user.userId!==id);
        return user;
    }
}
