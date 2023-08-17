/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/user.model';

@Schema()
export class Sport extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Reference to User model
  user: User;
}

export const SportSchema = SchemaFactory.createForClass(Sport);