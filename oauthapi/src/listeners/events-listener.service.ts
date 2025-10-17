// src/events-listener/events-listener.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

type TransactionCreatedPayload = {
  id: string;
  amount: number;
  currency: string;
  createdAt: string; // ISO 8601
};

@Injectable()
export class EventsListenerService {
  private readonly logger = new Logger(EventsListenerService.name);
   @RabbitSubscribe({
    exchange: 'bank.events',                // <-- must be a string
    routingKey: 'transaction.created.*',
    queue: 'transaction.created.q',
    queueOptions: {
      durable: true,
      deadLetterExchange: 'bank.dlx',
      deadLetterRoutingKey: 'transaction.created.dlq',
    },
  })
  async handleTransactionCreated(msg: any) {
    this.logger.log(`Got: ${JSON.stringify(msg)}`);
    // throw to nack, will be dead-lettered after retries exhausted
    if (!msg || !msg.id) {
      this.logger.error('Invalid message, missing id field');
      throw new Error('Invalid message format');
    }
}
}
