import * as mongoose from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { timestamp } from "rxjs"

export type StudentDocument = Student & Document // define the type of the document
@Schema()
export class Student {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    age: number

    @Prop({required: true, unique: true})
    email: string

    // @Prop({required: true, unique: true})
    // password: string

    @Prop({required: true})
    gender: string

    @Prop({required: true})
    class: string

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"User"})
    user:mongoose.Schema.Types.ObjectId;

    

}

export const StudentSchema = SchemaFactory.createForClass(Student)