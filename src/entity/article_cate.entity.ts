import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'article_cate' })
export class ArticleCateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  state: number;

  @OneToMany(() => ArticleEntity, (article) => article.cate)
  article: ArticleEntity[];
}
