"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const order_controller_1 = require("./order.controller");
const order_publish_service_1 = require("./order-publish.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_rabbitmq_1.RabbitMQModule.forRoot({
                uri: process.env.AMQP_URL ?? 'amqp://guest:guest@host.docker.internal:5672',
                connectionInitOptions: { wait: true, timeout: 5000 },
                prefetchCount: 10,
                exchanges: [{ name: 'shopping.events', type: 'topic' }],
            })],
        controllers: [app_controller_1.AppController, order_controller_1.OrderController],
        providers: [app_service_1.AppService, order_publish_service_1.OrderPublishService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map