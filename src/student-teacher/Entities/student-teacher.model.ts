import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentTeacher, StudentTeacherSchema } from "./student-teacher.schema";



@Global()
@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: StudentTeacher.name,
                useFactory:()=>{
                    return StudentTeacherSchema
                }
            }
        ])
    ],
    exports: [MongooseModule]
})

export class StudentTeacherModel{}