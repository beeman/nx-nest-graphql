import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { omit } from 'lodash'
import { AuthLoginInput } from '../dto/auth-login.input'
import { AuthRegisterInput } from '../dto/auth-register.input'
import { AuthHelper } from '../helpers/auth.helper'
import { User } from '../models/user'
import { UserToken } from '../models/user-token'
import { AuthDataService } from './auth-data.service'

@Injectable()
export class AuthService {
  constructor(private readonly service: AuthDataService, private readonly jwt: JwtService) {}

  private sign(user: User): UserToken {
    return {
      token: this.jwt.sign({ userId: user.id }),
      user: omit(user, ['password']),
    }
  }

  public async findUserById(userId: string) {
    return this.service.findUserById(userId)
  }

  public async login({ username, password }: AuthLoginInput) {
    const user = await this.service.findUserByUsername(username)

    if (!user) {
      throw new UnauthorizedException()
    }

    const passwordValid = await AuthHelper.validate(password, user.password)

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    // Sign token and return the user
    return this.sign(user)
  }

  public async register({ email, password, username }: AuthRegisterInput) {
    // Call out to the validation method
    const validUser = await this.service.validateRegistration({
      email: AuthHelper.formatEmail(email),
      username,
      password,
    })

    if (!validUser) {
      throw new BadRequestException(`Unable to register this user`)
    }

    // Looks like we are valid, let's hash the password and call the createUser method.
    const hashed = await AuthHelper.hash(password)
    const user = await this.service.createUser({
      ...validUser,
      password: hashed,
    })

    // Sign token and return the user
    return this.sign(user)
  }
}
