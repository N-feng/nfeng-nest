import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LessonStudentEntity } from './lesson_student.entity';

@Entity({ name: 'student' })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => LessonStudentEntity,
    (lesson_student) => lesson_student.student,
  )
  public lesson_student: LessonStudentEntity;
}
