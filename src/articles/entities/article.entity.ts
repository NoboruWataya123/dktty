import { Exclude } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    userId: number;
    @ManyToOne(() => User, (user) => user.articles)
    user: User

    @Column({
        nullable: true
    })
    categoryId: number;
    @ManyToOne(() => Category, (category) => category.articles)
    category: Category

    @OneToMany(type => Comment, (comment) => comment.article)
    comments: Comment[];
}
