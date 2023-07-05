import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);