import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './Enitities/Dtos/class.dto';

@Controller('class')
export class ClassController {
    constructor(private readonly classService:ClassService){}

    @Post()
    create(@Body() classDto:CreateClassDto){
        return this.classService.createClass(classDto)
    }

    @Get('/class-students/:id')
    getStudent(@Param('id') id: string){
        return this.classService.getAllStudent(id)
    }

    @Get('/class-teachers/:id')
    getTeacher(@Param('id') id: string){
        return this.classService.getAllTeachers(id)
    }
}
