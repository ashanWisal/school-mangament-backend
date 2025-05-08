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
import { StudentTeacherController } from './student-teacher/student-teacher.controller';
import { StudentTeacherService } from './student-teacher/student-teacher.service';
import { StudentTeacherModule } from './student-teacher/student-teacher.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    StudentModule, TeacherModule, CoursesModule,
    MongooseModule.forRoot('mongodb+srv://ashanwisal08:root@cluster0.tvzjfz0.mongodb.net/school'),
    StudentTeacherModule,
    AuthModule
  ],
  controllers: [AppController, StudentController, CoursesController, StudentTeacherController],
  providers: [AppService, TeacherService, StudentTeacherService],
  
})
export class AppModule {}
