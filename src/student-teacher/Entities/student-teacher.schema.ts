// student-teacher.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type StudentTeacherDocument = StudentTeacher & Document;

@Schema()
export class StudentTeacher {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true })
    student_Id: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true })
    teacher_Id: mongoose.Schema.Types.ObjectId;
}

export const StudentTeacherSchema = SchemaFactory.createForClass(StudentTeacher);