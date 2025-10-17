"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPublishService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let OrderPublishService = class OrderPublishService {
    amqpConnection;
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    async publishOrderCreated(order) {
        const routingKey = 'order.created';
        this.amqpConnection.publish(routingKey, 'shopping.events', order, {
            persistent: true,
            headers: { eventType: 'OrderCreated' },
            contentType: 'application/json',
            content: JSON.stringify(order)
        });
        return { status: 'Order Created event published', orderId: order.orderId };
    }
};
exports.OrderPublishService = OrderPublishService;
exports.OrderPublishService = OrderPublishService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], OrderPublishService);
//# sourceMappingURL=order-publish.service.js.map