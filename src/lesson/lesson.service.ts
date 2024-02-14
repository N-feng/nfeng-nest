import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../model/lesson.model';
import { Student } from '../model/student.model';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson,
  ) {}

  async findAll() {
    return await this.lessonModel.findAll({
      include: [Student],
    });
  }
}
