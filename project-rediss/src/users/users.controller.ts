import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ParseIntPipe, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindOneParams } from 'src/valid/find-one-param';
// import { Role } from '../enums/role.enum';
// import { Roles } from '../roles/roles.decorator';

@Controller('users')
// @UseGuards(AuthGuard)

@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    @Post()
    async create(@Body() user: User): Promise<User> {
      return this.userService.create(user);
    }
  
    @Post('login')
    async login(@Body() loginInfo: { username: string; password: string }) {
      return this.userService.login(loginInfo.username, loginInfo.password);
    }
  
    @Get(':id')
    // @UseGuards(RolesGuard)
    // @Roles('admin')
    async findById(@Param() params: FindOneParams, @Request() req): Promise<User> {
      const userRole = req.user.role;
      if(userRole == 'admin'){
        console.log(params.id);
        return this.userService.findById(params.id);
      }
      else if(userRole == 'user'){
        const userId = req.user.id;
        return this.userService.findByOneId(params.id,userId);
      }
    }

    // @Get(':ids')
    // @UseGuards(RolesGuard)
    // @Roles('user')
    // async findByOneId(@Param('ids')  ids: string, @Request() req): Promise<User> {
    //   const id = req.user.id;
    //   console.log(id,ids,"456");
    //   return this.userService.findByOneId(ids,id);
    // }
  
    @Get()
    @Roles('admin')
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Put(':id')
    async update(@Param('id') params: FindOneParams, @Body() user: User): Promise<User> {
      return this.userService.update(params.id, user);
    }
  
    @Delete(':id')
    async delete(@Param('id') params: FindOneParams): Promise<User> {
      return this.userService.delete(params.id);
    }
  
  }
  