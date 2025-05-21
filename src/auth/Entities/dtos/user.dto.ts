import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export enum RoleEnum {
    STUDENT = 'student',
    TEACHER = 'teacher'
  }
  
  export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsEnum(RoleEnum, { message: 'Role must be student or teacher' })
    role: RoleEnum;
  
    @IsOptional()
    @IsNumber()
    age?: number;
  
    @IsOptional()
    @IsString()
    gender?: string;
  
    @IsOptional()
    @IsString()
    className?: string;
  
    @IsOptional()
    @IsString()
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