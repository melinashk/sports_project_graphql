/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtStrategy } from '../auth/jwt.strategy';
import { GqlAuthGuard } from '../auth/auth.guard';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserResolver, JwtStrategy, GqlAuthGuard],
  exports: [UserService],
})
export class UserModule {}
