import { Module } from '@nestjs/common'
import { CoreModule } from '@nx-nest-starter/core'

@Module({
  imports: [CoreModule],
})
export class AppModule {}
