import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleCateEntity } from './article_cate.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('varchar')
  description: string;

  @Column()
  state: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => ArticleCateEntity, (article_cate) => article_cate.article)
  cateId: ArticleCateEntity;
}
