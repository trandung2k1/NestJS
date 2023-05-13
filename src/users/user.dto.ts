import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserRegisterDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}


export class UserLoginDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}
