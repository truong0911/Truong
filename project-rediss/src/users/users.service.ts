import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './users.schema';
import { User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ){}
    
    async create(user: User): Promise<User> {
        return this.userModel.create(user);
      }
    
      async findById(ids: string): Promise<User> {
        return this.userModel.findOne({id: ids});
      }

      async findByOneId(ids: string, id2: string): Promise<User> {
        return id2===ids?this.userModel.findOne({id: ids}):null;
      }
    
      async findAll(): Promise<User[]> {
        return this.userModel.find();
      }
    
      async update(ids: string, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({id: ids}, user, { new: true });
      }
    
      async delete(ids: string): Promise<User> {
        return this.userModel.findOneAndDelete({id: ids});
      }
    
      async login(username: string, password: string) {
        const user = await this.userModel.findOne({ username, password });
        return user ? user : null;
      }

      async findne(usernamee: string): Promise<User> {
        return this.userModel.findOne({username:usernamee});
      }
}
