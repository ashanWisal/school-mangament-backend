import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseModel } from './Entities/courses.model';
import { CoursesController } from './courses.controller';

@Module({
  imports: [CourseModel],
  controllers:[CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
