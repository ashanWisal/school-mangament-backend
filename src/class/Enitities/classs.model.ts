import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Classs, ClassSchema } from "./class.schema";



@Global()
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
         {
            name: Classs.name,
            useFactory: () => {
                return ClassSchema;
            }
         }   
        ])
    ],

    exports:[MongooseModule]           
    
    
})

export class ClasssModel {}