/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSportInput {
  @Field()
  name: string;

  @Field()
  description: string;
}