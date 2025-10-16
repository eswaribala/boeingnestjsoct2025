import { User } from './dto/user.type';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/user.type';
import { UpdateUserInput } from './dto/user.type';
export declare class UsersResolver {
    private readonly service;
    constructor(service: UsersService);
    getUsers(): User[];
    getUser(id: number): User | undefined;
    createUser(input: CreateUserInput): User;
    updateUser(input: UpdateUserInput): User | undefined;
    removeUser(id: number): User | undefined;
}
