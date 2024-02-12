import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lesson_student' })
export class LessonStudent {
  @PrimaryGeneratedColumn()
  lessonId: number;

  @PrimaryGeneratedColumn()
  studentId: number;
}
