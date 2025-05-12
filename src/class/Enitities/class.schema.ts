import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ClassDocument = Classs & Document

@Schema()
export class Classs{

    @Prop({required:true})
    title: string

    @Prop({required:true})
    section: string
    
    @Prop({required:true,type:[String], enum:['Mathematics','Urdu','English','Islamyat','science' ]})
    subjects:string[]

    @Prop({type:[mongoose.Schema.Types.ObjectId], ref:'Student'})
    student_Id: mongoose.Schema.Types.ObjectId[]

    @Prop({type:[mongoose.Schema.Types.ObjectId], ref:'Teacher'})
    teacher_Id: mongoose.Schema.Types.ObjectId[]


}

export const ClassSchema = SchemaFactory.createForClass(Classs)
