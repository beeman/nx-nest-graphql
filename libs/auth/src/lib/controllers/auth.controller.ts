import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../models/user'
import { AuthService } from '../services/auth.service'

import { AuthLoginInput } from '../dto/auth-login.input'
import { AuthRegisterInput } from '../dto/auth-register.input'

@Controller('auth')
export class AuthController<T extends User> {
  constructor(private readonly service: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return this.service.findUserById(req?.user?.id)
  }

  @Post('login')
  login(@Body() input: AuthLoginInput) {
    return this.service.login(input)
  }

  @Post('register')
  register(@Body() input: AuthRegisterInput) {
    return this.service.register(input)
  }
}
