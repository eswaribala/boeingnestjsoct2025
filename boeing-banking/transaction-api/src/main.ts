/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { TransactionsV1Module } from './app/transactions/transactions.v1.module';
import { TransactionsV2Module } from './app/transactions/transactions.v2.module';
import { AccountModule } from './app/transactions/account.module';

const globalPrefix = 'api';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI }); // => /api/v1, /api/v2

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  const account = new DocumentBuilder()
  .setTitle('Account API')
  .setDescription('Account management')
  .setVersion('1.0')
  .build();
  const accountDoc = SwaggerModule.createDocument(app, account, {
    include: [AccountModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/account/v1/docs', app, accountDoc);
  // Swagger: V1
  const v1 = new DocumentBuilder()
    .setTitle('Transaction API - V1')
    .setDescription('Endpoints for /api/v1')
    .setVersion('1.0')
    .build();
  const docV1 = SwaggerModule.createDocument(app, v1, {
    include: [TransactionsV1Module],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/v1/docs', app, docV1);

  // Swagger: V2
  const v2 = new DocumentBuilder()
    .setTitle('Transaction API - V2')
    .setDescription('Endpoints for /api/v2')
    .setVersion('2.0')
    .build();
  const docV2 = SwaggerModule.createDocument(app, v2, {
    include: [TransactionsV2Module],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/v2/docs', app, docV2);

  await app.listen(3000);
  console.log('Docs:', 'http://localhost:3000/api/account/v1/docs', '|', 'http://localhost:3000/api/v1/docs','|', 'http://localhost:3000/api/v2/docs');

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
