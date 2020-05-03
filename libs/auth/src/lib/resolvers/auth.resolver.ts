import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CtxUser } from '../decorators/ctx-user.decorator'
import { AuthLoginInput } from '../dto/auth-login.input'
import { AuthRegisterInput } from '../dto/auth-register.input'
import { GqlAuthGuard } from '../guards/gql-auth-guard'
import { User } from '../models/user'
import { UserToken } from '../models/user-token'

import { AuthService } from '../services/auth.service'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CtxUser() user: User): Promise<User> {
    return user
  }

  @Mutation(() => UserToken, { nullable: true })
  login(@Args('input') input: AuthLoginInput) {
    return this.service.login(input)
  }

  @Mutation(() => UserToken, { nullable: true })
  register(@Args('input') input: AuthRegisterInput) {
    return this.service.register(input)
  }
}
