import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTeacherDto, UpdateTeacherDto } from './Entities/Dtos/teacher.dto';
import { Teacher } from './Entities/teacher.schema';

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher.name) private readonly teacherModel: Model<any>){}

    async teacherCreate(teacher: CreateTeacherDto){
        try {
            const newTeacher = await new this.teacherModel(teacher)
            return newTeacher.save()
            
        } catch (error) {
            throw new BadRequestException("Something went wrong")
        }
    }

    async getAllTeacher(){
        try {
            return await this.teacherModel.find()
            
        } catch (error) {
            throw new HttpException(error?.message || "Something went wrong", error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getTeacherbyId(id: string){
        try {
            const objectId = new Types.ObjectId(id)
            const teacher = await this.teacherModel.findById(objectId)
            if(!teacher){
                throw new NotFoundException("invalid teacher data")
            }
            return teacher
            
        } catch (error) {
            throw new HttpException(error?.message || "something went wrong", error?.status|| HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateTeacher(id: string, teacher: UpdateTeacherDto){
        try {
            const objectId = new Types.ObjectId(id)
            const updatedTeacher = await this.teacherModel.findByIdAndUpdate(objectId, teacher, {new: true})
            return updatedTeacher
        
        } catch (error) {
            throw new HttpException(error?.message || "Something went wrong", error?.status|| HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteTeacher(id: string){
        try {
            const objectId = new Types.ObjectId(id)
            const teacher = await this.teacherModel.findByIdAndDelete(objectId)
            return teacher
            
        } catch (error) {
            throw new HttpException(error?.message || "Something wentwrong", error?.status|| HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
