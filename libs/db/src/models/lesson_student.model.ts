import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Student } from './student.model';

@Table({ tableName: 'lesson_student', timestamps: false })
export class LessonStudent extends Model {
  @Column({ primaryKey: true })
  id: number;

  @ForeignKey(() => Lesson)
  @Column
  public lessonId: number;

  @ForeignKey(() => Student)
  @Column
  public studentId: number;

  @BelongsTo(() => Lesson)
  public lesson: Lesson;

  @BelongsTo(() => Student)
  public student: Student;
}
