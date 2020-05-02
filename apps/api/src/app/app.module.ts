import { Module } from '@nestjs/common'
import { CoreModule } from '@nx-nest-graphql/core'

@Module({
  imports: [CoreModule],
})
export class AppModule {}
