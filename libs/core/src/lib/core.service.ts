import { Injectable } from '@nestjs/common'

@Injectable()
export class CoreService {
  uptime(): number {
    return process.uptime()
  }
}
