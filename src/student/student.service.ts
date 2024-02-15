import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../model/lesson.model';
import { Student } from '../model/student.model';

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
