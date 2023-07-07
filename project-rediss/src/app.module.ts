import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { RedisModule } from '@nestjs-modules/ioredis';


@Module({
  // imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, 
  //   {
  //   provide: APP_GUARD,
  //   useClass: RolesGuard,
  // }
], 
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), UsersModule,AuthModule],})
export class AppModule {} 

