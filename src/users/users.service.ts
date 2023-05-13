import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { UserLoginDto, UserRegisterDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>, private jwtService: JwtService) { }
  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find({});
  }
  async register(user: UserRegisterDto): Promise<Document<unknown, {}, IUser> & Omit<IUser & {
    _id: Types.ObjectId;
  }, never>> {
    try {
      const findUser = await this.userModel.findOne({ email: user.email });
      if (findUser) {
        throw new HttpException('Email already exits', 400);
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
        const newUser = new this.userModel({
          username: user.username,
          email: user.email,
          password: hashPassword
        })
        const savedUser = await newUser.save()
        return savedUser
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  async login(user: UserLoginDto): Promise<any> {
    try {
      const findUser = await this.userModel.findOne({ email: user.email });
      if (!findUser) {
        throw new HttpException('User not found', 404);
      } else {
        const isValidPassword = await bcrypt.compare(user.password, findUser.password);
        if (!isValidPassword) {
          throw new UnauthorizedException();
        }
        const rs = findUser["_doc"]
        delete rs.password;
        const accessToken = this.jwtService.sign({ userId: rs._id });
        return { ...rs, accessToken }
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
}
