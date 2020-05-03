import { Injectable, Logger } from '@nestjs/common'
import { AuthRegisterInput } from '@nx-nest-graphql/auth'
import { DataService } from '@nx-nest-graphql/data'
import { User } from '../models/user'

@Injectable()
export class AuthDataService {
  constructor(private readonly data: DataService) {}
  public async createUser(input: AuthRegisterInput): Promise<User> {
    return this.data.createUser(input)
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.data.findUserByEmail(email)
  }

  public async findUserById(id: string): Promise<User> {
    return this.data.findUserById(id)
  }

  public async findUserByUsername(username: string): Promise<User> {
    return this.data.findUserByUsername(username)
  }

  public async validateRegistration(input: AuthRegisterInput): Promise<AuthRegisterInput> {
    const [emailExists, usernameExists] = await Promise.all([
      this.findUserByEmail(input.email),
      this.findUserByUsername(input.username),
    ])
    if (emailExists || usernameExists) {
      Logger.log(`Email or username already exists`, 'AgentAuthService.validateRegistration')
      return Promise.resolve(null)
    }
    // If we agree with the registration we return the input
    return Promise.resolve(input)
  }
}
