import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  await app.listen(port);
  // console.log(`Docs: http://localhost:${port}/docs`);
  Logger.log(`REST:  http://localhost:${port}/graphql`);
}
bootstrap();
