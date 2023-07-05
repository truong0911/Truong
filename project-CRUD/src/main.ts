import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
