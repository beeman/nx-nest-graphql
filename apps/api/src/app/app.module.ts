import { Module } from '@nestjs/common'
import { AuthModule } from '@nx-nest-graphql/auth'
import { CoreModule } from '@nx-nest-graphql/core'

@Module({
  imports: [CoreModule, AuthModule],
})
export class AppModule {}
