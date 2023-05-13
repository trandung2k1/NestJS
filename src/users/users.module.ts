import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
require("dotenv").config();
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), JwtModule.register({
    global: true,
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: '5m' },
  }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
