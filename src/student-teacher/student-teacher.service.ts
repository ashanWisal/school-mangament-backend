import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StudentTeacher } from './Entities/student-teacher.schema';
import { StudentTeacherModel } from './Entities/student-teacher.model';
import { Model, Types } from 'mongoose';


@Injectable()
export class StudentTeacherService {
    constructor(@InjectModel(StudentTeacher.name) private studentTeacherModel: Model<StudentTeacher>){}

    async createTeacherAssociate(student_Id: string, teacher_Id: string){
        const enrollment = await new this.studentTeacherModel({student_Id, teacher_Id})
        return enrollment.save()
    }

    async getTeachersOfStudent(student_Id: string){
        return await this.studentTeacherModel.find({student_Id:new Types.ObjectId(student_Id)}).populate('teacher_Id', 'name email')
    }

    async getStudentsOfTeacher(teacherId: string){
        return await this.studentTeacherModel.find({teacher_Id: new Types.ObjectId(teacherId)}).populate('student_Id')

    }
}
