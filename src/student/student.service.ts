import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateStudentDto, UpdateStudentDto } from './Dtos/student.dto';
import { Student } from './Entities/student.schema';
import { Teacher } from 'src/teacher/Entities/teacher.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>) { }

  async createStudent(student: CreateStudentDto) {
    try {
      const newStudent = await new this.studentModel(student);
      return newStudent.save();
    } catch (error) {
      throw new BadRequestException(error?.message || "Invalid student Data", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllStudent() {
    try {
      return await this.studentModel.find()

    } catch (error) {
      throw new HttpException(error?.message || "Students not found", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getStudentById(id: string) {
    try {

      const objectId = new Types.ObjectId(id);
      const student = await this.studentModel.findById(objectId)
      if (!student) {
        throw new NotFoundException(`student with id: ${objectId} not found`)
      }

      return student;
    } catch (error) {
      throw new HttpException(error?.message || "Something went wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateStudent(id: string, updatestd: UpdateStudentDto) {
    try {
      const objectId = new Types.ObjectId(id)
      const updatedStudent = await this.studentModel.findByIdAndUpdate(objectId, updatestd, { new: true })
      if (!updatedStudent) {
        throw new NotFoundException(`student not found at id: ${objectId}`)
      }
      return updatedStudent

    } catch (error) {
      throw new HttpException(error?.message || "Went something wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteStudent(id: string) {
    try {
      const objectId = new Types.ObjectId(id)
      const deletedStudent = await this.studentModel.findByIdAndDelete(objectId)
      if (!deletedStudent) {
        throw new NotFoundException(`No studnet at id:${objectId}`)
      }
      return deletedStudent;

    } catch (error) {
      throw new HttpException(error?.message || "Went something wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async assignTeacherToStudent(studentId: string, teacherId: string) {
    try {
      const teacher = await this.teacherModel.findById(teacherId);
      if (!teacher) {
        throw new NotFoundException('Teacher Not Found');
      }
      const student = await this.studentModel.findByIdAndUpdate(
        studentId,
        { $addToSet: { teacherIds: teacherId } },
        { new: true }
      );

      if (!student) {
        throw new NotFoundException('Student Not Found');
      }

      return student;

    } catch (error) {
      throw new HttpException(error?.message || "Went something wron", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}
