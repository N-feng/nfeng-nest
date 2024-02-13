import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LessonStudentEntity } from './lesson_student.entity';

@Entity({ name: 'lesson' })
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => LessonStudentEntity,
    (lesson_student) => lesson_student.lesson,
  )
  public lesson_student: LessonStudentEntity[];
}
