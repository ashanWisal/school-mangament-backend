import { Module } from '@nestjs/common';
import { StudentTeacherModel } from './Entities/student-teacher.model';
import { StudentTeacherController } from './student-teacher.controller';
import { StudentTeacherService } from './student-teacher.service';

@Module({
    imports:[StudentTeacherModel],
    controllers:[StudentTeacherController],
    providers:[StudentTeacherService],
    exports:[StudentTeacherService]
})
export class StudentTeacherModule {}
