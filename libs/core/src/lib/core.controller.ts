import { Controller, Get } from '@nestjs/common'

import { CoreService } from './core.service'

@Controller()
export class CoreController {
  constructor(private readonly service: CoreService) {}

  @Get('uptime')
  uptime() {
    return this.service.uptime()
  }
}
