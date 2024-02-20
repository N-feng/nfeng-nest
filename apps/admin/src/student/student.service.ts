import { Lesson } from '@app/db/models/lesson.model';
import { Student } from '@app/db/models/student.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
