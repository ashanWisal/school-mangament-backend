import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Courses, CoursesSchema } from "./courses.schema";



@Global()
@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: Courses.name,
                useFactory: ()=> {
                    return CoursesSchema
                }
            }
        ])
    ],

    exports: [MongooseModule]
})

export class CourseModel{} 