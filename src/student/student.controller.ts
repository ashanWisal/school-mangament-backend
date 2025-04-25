import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './Dtos/student.dto';

@Controller('student')
export class StudentController {
    constructor (private readonly studentService: StudentService){}

    @Post()
    async create(@Body() user: CreateStudentDto){
        return this.studentService.createStudent(user)
    }
}
