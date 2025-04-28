import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto{
    @IsNotEmpty()
    @IsString()
    courseName: string;

    @IsNotEmpty()
    @IsString()
    courseCode: string;

    @IsNotEmpty()
    @IsString()
    courseDescription: string;
}

export class UpdateCourseDto{
    @IsNotEmpty()
    @IsString()
    courseName: string;

    @IsNotEmpty()
    @IsString()
    courseDescription: string;
}