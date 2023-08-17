import { Test, TestingModule } from '@nestjs/testing';
import { SportResolver } from './sport.resolver';

describe('PostResolver', () => {
  let resolver: SportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportResolver],
    }).compile();

    resolver = module.get<SportResolver>(SportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
