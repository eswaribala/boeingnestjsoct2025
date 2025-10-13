/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor,  ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Customers API')
    .setDescription('Customers & Addresses API (Postgres + TypeORM)')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, doc); // -> http://localhost:3000/swagger

  await app.listen(3000);
}

bootstrap();
