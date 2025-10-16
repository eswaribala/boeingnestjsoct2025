/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    .setTitle('JWT API')
    .setDescription('Boeing Insurance - Customer service')
    .setVersion('1.0.0')
    // .addBearerAuth() // uncomment if you add JWT later
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  // console.log(`Docs: http://localhost:${port}/docs`);
   Logger.log(`REST:  http://localhost:${port}/docs`);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/docs`
  );
}

bootstrap();
