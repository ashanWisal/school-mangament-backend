import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentTeacherService } from './student-teacher.service';
import { CreateTeacherAssociat } from './Entities/Dtos/student-teacher.dto';

@Controller('student-teacher')
export class StudentTeacherController {
    constructor(private readonly studentTeacherService: StudentTeacherService){}

    @Post()
    async create(@Body() body: {student_Id: string; teacher_Id: string}){
        return await this.studentTeacherService.createTeacherAssociate(body.student_Id, body.teacher_Id)
    }

    @Get('/student/:id')
    async getTeachers(@Param('id') id:string){
        return this.studentTeacherService.getTeachersOfStudent(id)
    }

    @Get('/teacher/:id')
    async getStudents(@Param('id') id: string){
        return this.studentTeacherService.getStudentsOfTeacher(id)
    }
}
