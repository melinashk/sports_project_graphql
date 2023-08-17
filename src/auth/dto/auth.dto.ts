/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType()
export class AuthResponse {
  @Field(() => UserDto)
  user: UserDto;

  @Field()
  accessToken: string;
}