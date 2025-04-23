import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type CoursesDocument = Courses & Document

@Schema()
export class Courses {
    @Prop({required: true})
    courseName: string;

    @Prop({required: true})
    CourseCode: string;

    @Prop({required: true})
    courseDescription: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"}]})
    studentIds: mongoose.Schema.Types.ObjectId[]; // array of student ids

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref:"Teacher"}]})
    teacherIds: mongoose.Schema.Types.ObjectId[]; // array of teacher ids
}

export const CoursesSchema = SchemaFactory.createForClass(Courses)