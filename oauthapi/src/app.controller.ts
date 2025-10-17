import { Controller, Get,Post,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PublisherService } from './publisher.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly pub: PublisherService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('publish')
  publish(@Body() body: { txId: string; amount: number; currency?: string }) {
    return this.pub.publishTransfer({ currency: 'INR', ...body });
  }
}
