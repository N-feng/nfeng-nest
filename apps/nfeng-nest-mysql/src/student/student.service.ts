import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../../libs/db/src/models/lesson.model';
import { Student } from '../../libs/db/src/models/student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  async findAll() {
    return await this.studentModel.findAll({
      include: [Lesson],
    });
  }
}
