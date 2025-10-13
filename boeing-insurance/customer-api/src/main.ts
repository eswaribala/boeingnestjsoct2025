import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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
    .setTitle('Customer API')
    .setDescription('Boeing Insurance - Customer service')
    .setVersion('1.0.0')
    // .addBearerAuth() // uncomment if you add JWT later
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  // console.log(`Docs: http://localhost:${port}/docs`);
   Logger.log(`REST:  http://localhost:${port}/docs`);

}
bootstrap();
