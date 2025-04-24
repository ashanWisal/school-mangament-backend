import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto{
    @IsNotEmpty()
    @IsString()
    courseName: string;

    @IsNotEmpty()
    @IsString()
    CourseCode: string;

    @IsNotEmpty()
    @IsString()
    courseDescription: string;
}