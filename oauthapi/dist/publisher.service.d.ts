import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
export declare class PublisherService {
    private readonly amqp;
    constructor(amqp: AmqpConnection);
    publishTransfer(event: {
        txId: string;
        amount: number;
        currency: string;
    }): Promise<{
        ok: boolean;
    }>;
}
