import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }
  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find({});
  }
  async register(user: UserDto) {
    return user
  }
}
