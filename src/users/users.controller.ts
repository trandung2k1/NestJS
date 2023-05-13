import { Controller, Get, Body, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { Response } from 'express';
import { UserDto } from './user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post("/register")
  async register(@Body() user: UserDto) {
    return await this.usersService.register(user)
  }
  @Post("/login")
  async login(@Body('email') email: string, @Body('password') password: string) {
    return {
      email: email,
      password
    }
  }
  @Get("/")
  async getUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }
}
