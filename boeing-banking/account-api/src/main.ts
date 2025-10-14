/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountsModule } from './app/accounts/accounts.module';

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
    .setTitle('Account API V1')
    .setDescription('Boeing Insurance - Account service for V1')
    .setVersion('1.0.0')
    // .addBearerAuth() // uncomment if you add JWT later
    .build();
  const doc = SwaggerModule.createDocument(app, config, {
    include: [AccountsModule],
    deepScanRoutes: true,
  }
);
  SwaggerModule.setup('docs/v1', app, doc);

  const port = process.env.PORT || 3001;
  await app.listen(port);

   Logger.log(`REST:  http://localhost:${port}/docs/v1`, 'Bootstrap');
}

bootstrap();
