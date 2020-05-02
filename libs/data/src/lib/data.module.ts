import { Module } from '@nestjs/common'
import { DataService } from './data.service'

@Module({
  providers: [DataService],
  exports: [DataService],
  controllers: [],
})
export class DataModule {}
