import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from './Entities/Dtos/teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService){}

    @Post()
    async create(@Body() teahcer: CreateTeacherDto){
        return this.teacherService.teacherCreate(teahcer)
    }

    @Get()
    async getAll(){
        return this.teacherService.getAllTeacher()
    }

    @Get(':id')
    async getbyId(@Param('id') id: string){
        return this.teacherService.getTeacherbyId(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body()  teacher:UpdateTeacherDto){
        return await this.teacherService.updateTeacher(id, teacher)
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.teacherService.deleteTeacher(id)
    }

}
