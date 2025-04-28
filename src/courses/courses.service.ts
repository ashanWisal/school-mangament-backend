import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newCourse = await this.courseModel.create(course);
    return newCourse;
  }

  async findAllCourse() {
    return await this.courseModel.find();
  }




  async findOneCourse(id: string) {
    const course = await this.courseModel.findById(id);  // NO Types.ObjectId here
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }
  


  async updateCourse(id: string, updatedCourse: UpdateCourseDto) {
    const objectId = new Types.ObjectId(id);
    return await this.courseModel.findByIdAndUpdate(objectId, updatedCourse, {
      new: true,
    });
  }

  async deleteCourse(id: string){
    const objectId = new Types.ObjectId(id);
    return await this.courseModel.findByIdAndDelete(objectId);
  }
}
