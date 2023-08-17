/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportResolver } from './sport.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport, SportSchema } from './sport.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Sport.name, schema: SportSchema}]),
    UserModule
  ],
  providers: [SportService, SportResolver]
})
export class SportModule {}
