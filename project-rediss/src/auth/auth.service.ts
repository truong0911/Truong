import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from '@nestjs-modules/ioredis';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRedis() private redis: Redis
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const timeWait = await this.redis.ttl(`F${user.id}`);
    if(timeWait>0){
      const mess = "wait: " + timeWait;
      throw new UnauthorizedException(mess);
    }
    await this.redis.setnx(`${user.id}`, '0');
    if (user?.password !== pass) {
      const failedLoginTimes = Number.parseInt(await this.redis.get(`${user.id}`)) + 1;

      if (failedLoginTimes === 4) {
        await this.redis.setex(`F${user.id}`, 30, '0');
      }
      console.log(await this.redis.get(`${user.id}`));
      console.log(await this.redis.ttl(`${user.id}`));
      console.log(failedLoginTimes);

      await this.redis.set(`${user.id}`, failedLoginTimes);
      throw new UnauthorizedException();
    }
    console.log("ok")
    await this.redis.set(`${user.id}`, '0');
    const payload = { id: user.id, username: user.username, password: user.password,
       fullname: user.fullname, dateOfBirth: user.dateOfBirth, gender: user.gender, role: user.role};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}