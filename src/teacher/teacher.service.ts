import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTeacherDto, UpdateTeacherDto } from './Entities/Dtos/teacher.dto';
import { Teacher } from './Entities/teacher.schema';

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher.name) private readonly teacherModel: Model<any>){}

    async teacherCreate(teacher: CreateTeacherDto){
         const newTeacher = await new this.teacherModel(teacher)
         return newTeacher.save()
    }

    async getAllTeacher(){
        return await this.teacherModel.find()
    }
    async getTeacherbyId(id: string){
        const objectId = new Types.ObjectId(id)
        const teacher = await this.teacherModel.findById(objectId)
        return teacher
    }

    async updateTeacher(id: string, teacher: UpdateTeacherDto){
        const objectId = new Types.ObjectId(id)
        const updatedTeacher = await this.teacherModel.findByIdAndUpdate(objectId, teacher, {new: true})
        return updatedTeacher
    }

    async deleteTeacher(id: string){
        const objectId = new Types.ObjectId(id)
        const teacher = await this.teacherModel.findByIdAndDelete(objectId)
        return teacher
    }
}
