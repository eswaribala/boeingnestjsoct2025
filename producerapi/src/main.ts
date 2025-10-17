import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  // API versioning (optional)
  // app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Swagger/OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Order Publisher API V1')
    .setDescription('Boeing Banking - Order Publisher service for V1')
    .setVersion('1.0.0')
    // .addBearerAuth() // uncomment if you add JWT later
    .build();
  const doc = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
    deepScanRoutes: true,
  }
);
  SwaggerModule.setup('docs/v1', app, doc);

  const port = process.env.PORT || 3005;
  await app.listen(port);

  Logger.log(`REST:  http://localhost:${port}/docs/v1`, 'Bootstrap');

}
bootstrap();
