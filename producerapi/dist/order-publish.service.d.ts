import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { OrderDto } from "./dto/order.dto";
export declare class OrderPublishService {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    publishOrderCreated(order: OrderDto): Promise<{
        status: string;
        orderId: number;
    }>;
}
