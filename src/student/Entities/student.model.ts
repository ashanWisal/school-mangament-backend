import { Global, Module } from "@nestjs/common";
import { Student, StudentSchema } from "./student.schema";
import { MongooseModule } from "@nestjs/mongoose";



@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
         {
            name: Student.name,
            useFactory: () => {
                return StudentSchema;
            }
         }   
        ])
    ],

    exports:[MongooseModule]           
    
    
})

export class StudentModel {}