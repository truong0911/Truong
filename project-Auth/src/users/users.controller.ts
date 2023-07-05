import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
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
  
    @Get(':ids')
    // @UseGuards(RolesGuard)
    // @Roles('admin')
    async findById(@Param('ids') ids: string, @Request() req): Promise<User> {
      const userRole = req.user.role;
      if(userRole == 'admin'){
        return this.userService.findById(ids);
      }
      else if(userRole == 'user'){
        const id = req.user.id;
        return this.userService.findByOneId(ids,id);
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
  
    @Put(':ids')
    async update(@Param('ids') ids: string, @Body() user: User): Promise<User> {
      return this.userService.update(ids, user);
    }
  
    @Delete(':ids')
    async delete(@Param('ids') ids: string): Promise<User> {
      return this.userService.delete(ids);
    }
  
  }