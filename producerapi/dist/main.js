"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Order Publisher API V1')
        .setDescription('Boeing Banking - Order Publisher service for V1')
        .setVersion('1.0.0')
        .build();
    const doc = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [app_module_1.AppModule],
        deepScanRoutes: true,
    });
    swagger_1.SwaggerModule.setup('docs/v1', app, doc);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    common_2.Logger.log(`REST:  http://localhost:${port}/docs/v1`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map