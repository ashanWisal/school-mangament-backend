import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { CoursesModule } from './courses/courses.module';
import { CoursesController } from './courses/courses.controller';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherService } from './teacher/teacher.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [StudentModule, TeacherModule, CoursesModule,
    MongooseModule.forRoot('mongodb+srv://ashanwisal08:root@cluster0.tvzjfz0.mongodb.net/school')
  ],
  controllers: [AppController, StudentController, CoursesController],
  providers: [AppService, TeacherService],
  
})
export class AppModule {}
