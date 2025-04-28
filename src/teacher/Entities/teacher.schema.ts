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

    @Prop({ required: true })
    subject: string;

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: "Student"}]})
    studentIds: mongoose.Schema.Types.ObjectId[]; // array of student ids

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Courses"})
    courseId: mongoose.Schema.Types.ObjectId; 

}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);