import { Lesson } from '@app/db/models/lesson.model';
import { Student } from '@app/db/models/student.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
