import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherAssociat{
    @IsNotEmpty()
    @IsString()
    teacher_Id:string

    @IsNotEmpty()
    @IsString()
  student_Id:string
}