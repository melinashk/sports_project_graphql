/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWTTOKENKEY',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [JwtStrategy, GqlAuthGuard, AuthResolver, AuthService],
  exports: [JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}