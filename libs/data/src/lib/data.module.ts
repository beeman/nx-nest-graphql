import { Module } from '@nestjs/common'
import { DataService } from './data.service'

@Module({
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
