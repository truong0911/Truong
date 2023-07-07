import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsDateString, IsNumberString} from 'class-validator';

@Schema()
export class User {
  @Prop()
  @IsNotEmpty()
  @IsNumberString()
  id: string;

  @Prop()
  @IsNotEmpty()
  username: string;

  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsNotEmpty()
  fullname: string;

  @Prop()
  @IsDateString()
  dateOfBirth: Date;

  @Prop()
  @IsNotEmpty()
  gender: string;

  @Prop()
  @IsNotEmpty()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);