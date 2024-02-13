import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly lessonRepository: Repository<StudentEntity>,
  ) {}

  async findAll() {
    return await this.lessonRepository.find({
      relations: ['lesson_student'],
    });
  }
}
