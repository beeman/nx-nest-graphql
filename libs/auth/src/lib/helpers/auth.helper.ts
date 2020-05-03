import { compare, hash } from 'bcrypt'

import { randomBytes } from 'crypto'

export class AuthHelper {
  static randomToken = (size = 64) => randomBytes(size).toString('hex')
  static formatEmail = (email: string = '') => email.trim().toLowerCase()
  static validate(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  static hash(password: string): Promise<string> {
    return hash(password, 10)
  }
}
