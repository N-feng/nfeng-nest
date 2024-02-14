import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from 'src/model/student.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
