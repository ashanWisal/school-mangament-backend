import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from './Entities/Dtos/teacher.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService){}

    @Public()
    @Post()
    async create(@Body() teahcer: CreateTeacherDto){
        return this.teacherService.teacherCreate(teahcer)
    }
    @Public()
    @Get()
    async getAll(){
        return this.teacherService.getAllTeacher()
    }

    @Public()
    @Get(':id')
    async getbyId(@Param('id') id: string){
        return this.teacherService.getTeacherbyId(id)
    }

    @Public()
    @Patch(':id')
    async update(@Param('id') id: string, @Body()  teacher:UpdateTeacherDto){
        return await this.teacherService.updateTeacher(id, teacher)
    }

    @Public()
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.teacherService.deleteTeacher(id)
    }

}
