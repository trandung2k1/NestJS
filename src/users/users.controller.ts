import { Controller, Get, Body, Post, Res, InternalServerErrorException, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { UserRegisterDto, UserLoginDto } from './user.dto';
import { Document, ObjectId } from 'mongoose';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post("/register")
  async register(@Body() user: UserRegisterDto): Promise<(Document<unknown, {}, IUser> & Omit<IUser & { _id: ObjectId; }, never>)> {
    try {
      const result = await this.usersService.register(user);
      return result
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  @Post("/login")
  async login(@Body() user: UserLoginDto) {
    try {
      return await this.usersService.login(user);
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  @Get("/")
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }
}
