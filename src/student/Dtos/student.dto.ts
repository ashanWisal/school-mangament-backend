import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateStudentDto{
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    class: string;
    
}