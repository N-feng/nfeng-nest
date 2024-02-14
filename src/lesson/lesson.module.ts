import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Lesson } from '../model/lesson.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
