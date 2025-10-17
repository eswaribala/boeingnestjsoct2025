import { OrderPublishService } from "./order-publish.service";
import { OrderDto } from "./dto/order.dto";
export declare class OrderController {
    private readonly orderPublishService;
    constructor(orderPublishService: OrderPublishService);
    createOrder(order: OrderDto): Promise<{
        status: string;
        orderId: number;
    }>;
}
