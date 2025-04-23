import * as mongoose from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type StudentDocument = Student & Document // define the type of the document
@Schema()
export class Student {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    age: number

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    gender: string

    @Prop({required: true})
    class: string

    @Prop({required: true})
    createdAt: Date

    @Prop({type:[ {type: mongoose.Schema.Types.ObjectId, ref: "Teacher"}]})
    teacherIds: mongoose.Schema.Types.ObjectId[]

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref: "Courses"}]})
    courseIds: mongoose.Schema.Types.ObjectId[] // array of course ids

}

export const StudentSchema = SchemaFactory.createForClass(Student)