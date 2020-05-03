import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DataService {
  public readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async createUser({
    username,
    password,
    email,
  }: {
    password: string
    username: string
    email: string
  }) {
    return this.prisma.user.create({
      data: { username, password, role: 'User', email },
    })
  }

  public findUserByUsername(username: string) {
    return this.prisma.user.findOne({ where: { username } })
  }

  public findUserById(userId: string) {
    return this.prisma.user.findOne({ where: { id: userId } })
  }

  public findUserByEmail(email: string) {
    return this.prisma.user.findOne({ where: { email } })
  }
}
