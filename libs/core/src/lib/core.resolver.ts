import { Float, Query, Resolver } from '@nestjs/graphql'
import { CoreService } from './core.service'

@Resolver()
export class CoreResolver {
  constructor(private readonly service: CoreService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
