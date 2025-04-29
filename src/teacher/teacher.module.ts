import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherModel } from './Entities/teacher.model';
import { TeacherService } from './teacher.service';

@Module({
  imports:[TeacherModel],
  controllers: [TeacherController],
  providers:[TeacherService],
})
export class TeacherModule {}
