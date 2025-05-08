import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name

    @IsNotEmpty()
    @IsString()
    email


    @IsNotEmpty()
    @IsString()
    password

    @IsEnum(['student', 'teacher'])
    role:'student' | 'teacher'
    
    @IsNotEmpty()
    @IsNumber()
    age?: number;


    @IsNotEmpty()
    @IsString()
    gender?: string;


    @IsNotEmpty()
    @IsString()
    class?: string;


    @IsString()
    @IsNotEmpty()
    subject?: string;

}


export class LoginDto {

    @IsNotEmpty()
    @IsString()
    email


    @IsNotEmpty()
    @IsString()
    password


}