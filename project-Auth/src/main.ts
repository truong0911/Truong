import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Redis } from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.REDIS,
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //     retryAttempts:10,
  //   },
  // });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

}
bootstrap();
