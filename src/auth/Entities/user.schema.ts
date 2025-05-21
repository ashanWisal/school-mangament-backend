import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({ timestamps: true })
export class User {

  @Prop()
  name: string

  @Prop({
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  })
  email: string;

  @Prop()
  password: string
  
  @Prop({required:true, enum:['student', 'teacher', 'admin']})
  role:'student' | 'teacher' | 'admin'
}

export const UserSchema = SchemaFactory.createForClass(User)