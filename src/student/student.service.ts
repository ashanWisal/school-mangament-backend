import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStudentDto, UpdateStudentDto } from './Dtos/student.dto';
import { Student } from './Entities/student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<any>) {}

  async createStudent(student: CreateStudentDto) {
    const newStudent = await  new this.studentModel(student);
    return newStudent.save();
  }

  async getAllStudent(){
    return  await this.studentModel.find()
  }

  async getStudentById(id: string){
    const objectId = new Types.ObjectId(id);
    const student = await this.studentModel.findById(objectId)

    return student;
  }

  async updateStudent(id: string, updatestd: UpdateStudentDto){
    const objectId = new Types.ObjectId(id)
    const updatedStudent =await this.studentModel.findByIdAndUpdate(objectId, updatestd, {new: true})
    return updatedStudent
  }

  async deleteStudent(id:string){
    const objectId = new Types.ObjectId(id)
    return await this.studentModel.findByIdAndDelete(objectId)
  }
}
