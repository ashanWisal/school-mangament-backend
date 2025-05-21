import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateStudentDto{
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    className: string;
    
}


export class UpdateStudentDto{
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    gender: string;
}