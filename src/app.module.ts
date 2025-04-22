import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { CoursesModule } from './courses/courses.module';
import { CoursesController } from './courses/courses.controller';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherService } from './teacher/teacher.service';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';

@Module({
  imports: [StudentModule, TeacherModule, CoursesModule],
  controllers: [AppController, StudentController, CoursesController],
  providers: [AppService, TeacherService],
})
export class AppModule {}
