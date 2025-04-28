import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './Entities/Dtos/courses.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService:CoursesService) {}
    
    @Post()
    async create(@Body() course: CreateCourseDto){
        return await this.coursesService.createCourse(course);
    }

    @Get()
    async findAll(){
        return await this.coursesService.findAllCourse();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        console.log("*********************id:", id)
        return await this.coursesService.findOneCourse(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatedCourse: UpdateCourseDto){
        return await this.coursesService.updateCourse(id, updatedCourse);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return await this.coursesService.deleteCourse(id);
 
    }


}
