import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email:string;
  @Prop({ required: true })
  passwordHash:string;
  @Prop({ required: true })
  name:string;
  @Prop({ type: [String], default: ['USER'] })
  roles:string[];
}
export const UserSchema = SchemaFactory.createForClass(User);

