import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { LessonStudent } from './lesson_student.model';
import { Lesson } from './lesson.model';

@Table({ tableName: 'student', timestamps: false })
export class Student extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Lesson, () => LessonStudent)
  lessons: Lesson[];
}
