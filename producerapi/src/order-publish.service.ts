import { Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { OrderDto } from "./dto/order.dto";
import { ok } from "assert";
@Injectable()

export class OrderPublishService {

    constructor(private readonly amqpConnection: AmqpConnection) {}

    public async publishOrderCreated(order: OrderDto) {
        const routingKey = 'order.created';
        this.amqpConnection.publish(routingKey, 'shopping.events', order,{
            persistent: true,
            headers: { eventType: 'OrderCreated' },
            contentType: 'application/json',
            content: JSON.stringify(order)
        });
        return { status: 'Order Created event published', orderId: order.orderId };
    }

}