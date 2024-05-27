import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { EnvSchema } from '../config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<EnvSchema, true>,
  ) {}

  @Get()
  getApp() {
    const port = this.configService.get('PORT', { infer: true });
    const env = this.configService.get('ENV', { infer: true });
    return { version: 1, port, env };
  }
}
