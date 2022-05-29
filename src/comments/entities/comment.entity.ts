import { Exclude } from 'class-transformer';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    content: string;
    
    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @Column({
        nullable: true
    })
    articleId: number;
    @ManyToOne(() => Article, (article) => article.comments)
    article: Article
}
