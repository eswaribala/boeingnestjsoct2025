import { Controller, Get,Post,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
//import { PublisherService } from 'publish.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @Get('hello')
   @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  admin() {
    return { message: 'Only admins can see this.' };
  }
/*
  @Post('publish')
  publish(@Body() body: { txId: string; amount: number; currency?: string }) {
    return this.pub.publishTransfer({ currency: 'INR', ...body });
  }
    */
}
