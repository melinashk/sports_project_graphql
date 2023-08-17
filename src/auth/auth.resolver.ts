/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './input/auth.input';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async loginUser(@Args('input') input: LoginInput): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );
    console.log(user, "iiiiiiiiii")
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokenResponse = await this.authService.login(user);
    return { user, ...tokenResponse };
  }
}