import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './Dtos/student.dto';

@Controller('student')
export class StudentController {
    constructor (private readonly studentService: StudentService){}

    @Post()
    async create(@Body() user: CreateStudentDto){
        return this.studentService.createStudent(user)
    }

    @Get()
    async findAll(){
        return this.studentService.getAllStudent()
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.studentService.getStudentById(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatestd:UpdateStudentDto){
        return this.studentService.updateStudent(id, updatestd)
    }

    
    

    @Delete(':id')
    async delete(@Param('id') id: string){
        const result = await this.studentService.deleteStudent(id)
        return result
    }

    @Patch(':studentId/teacher')
        async assignTeacher(@Param('studentId') studentId: string, @Query('teacherId') teacherId: string){
            return this.studentService.assignTeacherToStudent(studentId, teacherId)
        }

}
