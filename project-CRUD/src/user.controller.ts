import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() loginInfo: { username: string; password: string }) {
    return this.userService.login(loginInfo.username, loginInfo.password);
  }

  @Get(':ids')
  async findById(@Param('ids') ids: string): Promise<User> {
    return this.userService.findById(ids);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put(':ids')
  async update(@Param('ids') ids: string, @Body() user: User): Promise<User> {
    return this.userService.update(ids, user);
  }

  @Delete(':ids')
  async delete(@Param('ids') ids: string): Promise<User> {
    return this.userService.delete(ids);
  }

}