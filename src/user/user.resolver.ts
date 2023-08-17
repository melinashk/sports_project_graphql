/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CreateUserInput } from './input/user.input';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserDto> {
    return this.userService.create(input);
  }

  @Query(() => UserDto)
  async currentUser(@Args('id') id: string): Promise<UserDto> {
    const user = await this.userService.findUserById(id);
    return user;
  }
}