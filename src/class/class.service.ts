import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classs } from './Enitities/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './Enitities/Dtos/class.dto';
import { ClasssModel } from './Enitities/classs.model';

@Injectable()
export class ClassService {
    constructor(@InjectModel(Classs.name) private readonly classModel:Model<Classs>){}

    async createClass(classDto:CreateClassDto){
        return await this.classModel.create(classDto)
    }

    async getAllStudent(classId: string){
        return await this.classModel.findById(classId).populate('student_Id', 'name age email').select('-teacher_Id') 
    }

    async getAllTeachers(classId: string){
        return await this.classModel.findById(classId).populate('teacher_Id', 'name subject').select('-student_Id')
    }
}
