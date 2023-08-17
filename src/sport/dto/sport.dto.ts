/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserDto } from '../../user/dto/user.dto'; // Import UserDto

@ObjectType()
export class SportDto {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => UserDto, { nullable: true }) 
  user: UserDto;
}