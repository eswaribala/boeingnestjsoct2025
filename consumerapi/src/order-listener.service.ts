import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@nestjs/common';
@Injectable()
export class OrderListenerService {
 private readonly logger = new Logger(OrderListenerService.name);
    @RabbitSubscribe({
        exchange: 'shopping.events',
        routingKey: 'order.created',
        queue: 'order.created.queue',
        queueOptions: {
        durable: true,
        deadLetterExchange: 'shopping.dlx',
        deadLetterRoutingKey: 'transaction.created.dlq',
    },
    })
    public async handleOrderCreated(message: any) {
        this.logger.log(`Got: ${JSON.stringify(message)}`);
    // throw to nack, will be dead-lettered after retries exhausted
    if (!message || !message.id) {
      this.logger.error('Invalid message, missing id field');
      throw new Error('Invalid message format');
    }
    }

}