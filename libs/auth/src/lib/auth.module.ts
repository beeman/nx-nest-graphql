import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { DataModule } from '@nx-nest-graphql/data'

import { AUTH_JWT_SECRET } from './auth.constants'
import { AuthController } from './controllers/auth.controller'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthDataService } from './services/auth-data.service'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    DataModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({ secret: AUTH_JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, AuthDataService, JwtStrategy],
})
export class AuthModule {}
