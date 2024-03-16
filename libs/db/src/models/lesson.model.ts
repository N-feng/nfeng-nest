import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Student } from './student.model';
import { LessonStudent } from './lessonStudent.model';

@Table({ tableName: 'lesson', timestamps: false })
export class Lesson extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Student, () => LessonStudent)
  // students: Student[];
  students: Array<Student & { LessonStudent: LessonStudent }>;
}
