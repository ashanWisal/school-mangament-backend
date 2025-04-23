import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Teacher, TeacherSchema } from "./teacher.schema";


@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
        {
            name: Teacher.name,
            useFactory:()=>{
                return TeacherSchema; // return the schema for the teacher model
            }
        }
    ])],
    exports: [MongooseModule]
})

export class TeacherModel {} // export the module for the teacher model