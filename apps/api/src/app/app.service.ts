import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  status(): { uptime: number } {
    return { uptime: process.uptime() };
  }
}
