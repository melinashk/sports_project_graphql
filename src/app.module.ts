import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { SportModule } from './sport/sport.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://melinashakya20:melina20@cluster0.s7yo3qk.mongodb.net/Sport?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWTTOKENKEY',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    SportModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
