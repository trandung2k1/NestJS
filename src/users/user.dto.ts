import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}
