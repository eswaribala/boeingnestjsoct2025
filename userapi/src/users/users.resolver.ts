import { Resolver } from '@nestjs/graphql';
import { User } from './dto/user.type';
import { UsersService } from './users.service';
import { Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateUserInput } from './dto/user.type';
import { UpdateUserInput } from './dto/user.type';
@Resolver(() => User)
export class UsersResolver {

constructor(private readonly service: UsersService) {}

  @Query(() => [User], { name: 'users' })
  getUsers() {
    return this.service.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args('id', { type: () => ID }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.service.create(input);
  }

  @Mutation(() => User, { nullable: true })
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.service.update(input);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => ID }) id: number) {
    return this.service.remove(id);
  }
}


