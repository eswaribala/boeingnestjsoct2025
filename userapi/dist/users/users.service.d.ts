import { CreateUserInput, UpdateUserInput, User } from './dto/user.type';
export declare class UsersService {
    users: User[];
    create(user: CreateUserInput): User;
    findAll(): User[];
    findOne(id: string): User | undefined;
    update(input: UpdateUserInput): User | undefined;
    remove(id: string): User | undefined;
}
