import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';

@Module({
  // controllers: [AppController],
  // providers: [AppService],
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), UserModule],
})
export class AppModule {}
