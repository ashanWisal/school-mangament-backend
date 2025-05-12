import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClasssModel } from './Enitities/classs.model';

@Module({
  imports:[ClasssModel],
  controllers: [ClassController],
  providers: [ClassService],
  exports:[ClassService]
})
export class ClassModule {}
