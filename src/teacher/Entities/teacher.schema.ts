import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose"; 

export type TeacherDocument = Teacher & Document; // define the type of the document

@Schema()
export class Teacher {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    // @Prop({ required: true })
    // password: string;

    @Prop({ required: true })
    subject: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"User"})
    user:mongoose.Schema.Types.ObjectId

}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);