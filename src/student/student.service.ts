import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateStudentDto, UpdateStudentDto } from './Dtos/student.dto';
import { Student } from './Entities/student.schema';
import { Teacher } from 'src/teacher/Entities/teacher.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>) {}

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

   async assignTeacherToStudent(studentId: string, teacherId: string){
    const teacher = await this.teacherModel.findById(teacherId);
    if (!teacher) {
      throw new Error('Teacher Not Found');
    }
    const student = await this.studentModel.findByIdAndUpdate(
      studentId,
      { $addToSet: { teacherIds: teacherId } },
      { new: true }
    );
    
    if (!student) {
      throw new Error('Student Not Found');
    }
    
    return student;
  }


  
}
