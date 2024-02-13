import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from '../entity/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
