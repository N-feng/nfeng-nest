import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from './student.entity';
import { LessonEntity } from './lesson.entity';

@Entity({ name: 'lesson_student' })
export class LessonStudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public lessonId: number;

  @Column()
  public studentId: number;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.lesson_student)
  public lesson: LessonEntity;

  @ManyToOne(() => StudentEntity, (lesson) => lesson.lesson_student)
  public student: StudentEntity;
}
