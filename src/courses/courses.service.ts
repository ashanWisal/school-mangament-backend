import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Courses } from './Entities/courses.schema';
import { Model, Types } from 'mongoose';
import { CreateCourseDto, UpdateCourseDto } from './Entities/Dtos/courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Courses.name) private readonly courseModel: Model<any>,
  ) {}

  async createCourse(course: CreateCourseDto) {
    try {
      const newCourse = await this.courseModel.create(course);
      return newCourse;
    } catch (error) {
      throw new BadRequestException('Invalid Course')
    }
   
  }

  async findAllCourse() {
    try {
    return await this.courseModel.find();
      
    } catch (error) {
      throw new HttpException(error?.message || "Not Found", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }




  async findOneCourse(id: string) {
    try {
      const course = await this.courseModel.findById(id); 
      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }
      return course;
    } catch (error) {
      throw new HttpException(error?.message  ||"Somethng went wrong",error?.status ||HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
  


  async updateCourse(id: string, updatedCourse: UpdateCourseDto) {
    try {
      const objectId = new Types.ObjectId(id);
    return await this.courseModel.findByIdAndUpdate(objectId, updatedCourse, {
      new: true,
    });
    } catch (error) {
      throw new HttpException(error?.message || "Course Nor Found", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  async deleteCourse(id: string){
    try {
      const objectId = new Types.ObjectId(id);
      return await this.courseModel.findByIdAndDelete(objectId);
    
    } catch (error) {
      throw new HttpException(error?.message || "Something went wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
