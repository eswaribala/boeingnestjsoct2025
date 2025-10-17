import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { OrderPublishService } from "./order-publish.service";
import { OrderDto } from "./dto/order.dto";

@ApiTags('orders')
@Controller('orders')
export class OrderController {

    constructor(private readonly orderPublishService: OrderPublishService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order and publish an event' })
    public async createOrder(order: OrderDto) {
        const result = await this.orderPublishService.publishOrderCreated(order);
        return result;
    }

}