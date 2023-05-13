// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
// export type CatDocument = HydratedDocument<User>;
// @Schema()
// export class User {
//   @Prop({ required: true })
//   username: string;

//   @Prop({ required: true, unique: true })
//   email: number;

//   @Prop({ required: true })
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

import { Schema } from 'mongoose';
import { IUser } from './interfaces/user.interface';

export const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
