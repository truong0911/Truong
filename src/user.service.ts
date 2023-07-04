import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { async } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findById(ids: string): Promise<User> {
    return this.userModel.findOne({id: ids});
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

}