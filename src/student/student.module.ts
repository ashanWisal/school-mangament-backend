import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentModel } from './Entities/student.model';
import { StudentController } from './student.controller';

@Module({
  imports: [StudentModel],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
