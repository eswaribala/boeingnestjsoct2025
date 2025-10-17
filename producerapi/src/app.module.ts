import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [RabbitMQModule.forRoot({
  uri: process.env.AMQP_URL ?? 'amqp://guest:guest@host.docker.internal:5672',
  connectionInitOptions: { wait: true, timeout: 5000 },
  prefetchCount: 10,
  exchanges: [{ name: 'shopping.events', type: 'topic' }],
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
