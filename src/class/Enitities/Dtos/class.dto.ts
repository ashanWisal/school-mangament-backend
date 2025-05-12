import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Subjects {
    Mathematics = 'Mathematics',
    Urdu = 'Urdu',
    English = 'English',
    Islamyat = 'Islamyat',
    science = 'science'
}

export class CreateClassDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    section: string


    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Subjects, { each: true })
    subjects: Subjects[];

    @IsArray()
    @ArrayNotEmpty()
    student_Id:string[]

    @IsArray()
    @ArrayNotEmpty()
    teacher_Id: string[]


}