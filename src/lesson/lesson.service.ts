import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../../libs/db/src/models/lesson.model';
import { Student } from '../../libs/db/src/models/student.model';

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
