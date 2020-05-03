import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AUTH_JWT_SECRET } from '../auth.constants'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_JWT_SECRET,
    })
  }

  async validate(payload) {
    const user = await this.service.findUserById(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
