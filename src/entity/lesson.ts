import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LessonStudent } from './lesson_student';

@Entity({ name: 'lesson' })
export class ArticleCateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => LessonStudent, (lesson_student) => lesson_student.studentId)
  studentId: LessonStudent[];
}
