import { Float, Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly service: AppService) {}

  @Query(() => Float)
  uptime() {
    return this.service.status().uptime;
  }
}
