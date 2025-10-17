/*
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class PublisherService {
  constructor(private readonly amqp: AmqpConnection) {}

  async publishTransfer(event: { txId: string; amount: number; currency: string }) {
    // routing key pattern: domain.action.version
    const routingKey = 'transfer.created.v1';
    await this.amqp.publish('bank.events', routingKey, event, {
      persistent: true,
      contentType: 'application/json',
    });
    return { ok: true };
  }
}
*/