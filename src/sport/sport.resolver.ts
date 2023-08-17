/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SportService } from './sport.service';
import { CreateSportInput } from './input/sport.input';
import { CurrentUser } from '../auth/create-user.decorator';
import { User } from '../user/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { SportDto } from './dto/sport.dto';

@Resolver(() => SportDto)
export class SportResolver {
  constructor(private readonly sportService: SportService) {}

  @Query(() => [SportDto])
  async sport(@Args('id') id: string): Promise<SportDto> {
    return this.sportService.findSport(id);
  }

  @Query(() => [SportDto])
  async sports(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ): Promise<SportDto[]> {
    return this.sportService.findAllSports(page, limit);
  }

  @Mutation(() => SportDto)
  @UseGuards(GqlAuthGuard)
  async createSport(
    @Args('input') input: CreateSportInput,
    @CurrentUser() user: User,
  ): Promise<SportDto> {
    return this.sportService.create(input, user);
  }

  @Mutation(() => SportDto)
  @UseGuards(GqlAuthGuard)
  async updateSport(
  @Args('id') id: string,
  @Args('input') input: CreateSportInput,
  @CurrentUser() user: User,
): Promise<SportDto> {
  return this.sportService.update(id, input, user);
}

@UseGuards(GqlAuthGuard)
@Mutation(() => SportDto) 
async deleteSport(
  @Args('id') id: string,
  @CurrentUser() user: User,
): Promise<SportDto> {
  return this.sportService.deleted(id, user);
}

}