import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classs } from './Enitities/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './Enitities/Dtos/class.dto';
import { ClasssModel } from './Enitities/classs.model';

@Injectable()
export class ClassService {
    constructor(@InjectModel(Classs.name) private readonly classModel:Model<Classs>){}

    async createClass(classDto:CreateClassDto){
        try {
            return await this.classModel.create(classDto)
            
        } catch (error) {
            throw new BadRequestException("Invalid class data")
        }
    }

    async getAllStudent(classId: string){
        try {
            return await this.classModel.findById(classId).populate('student_Id', 'name age email').select('-teacher_Id') 
            
        } catch (error) {
            throw new HttpException(error?.message || "went something wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }

    async getAllTeachers(classId: string){
        try {
            return await this.classModel.findById(classId).populate('teacher_Id', 'name subject').select('-student_Id')
            
        } catch (error) {
           throw new HttpException(error?.message || "went somwthing wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR) 
        }
    }
}
