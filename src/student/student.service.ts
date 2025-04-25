import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './Dtos/student.dto';
import { Student } from './Entities/student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<any>) {}

  async createStudent(student: CreateStudentDto) {
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }
}
