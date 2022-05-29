import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) { }

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articlesRepository.create(createArticleDto);
    await this.articlesRepository.save(article);
    return article;
  }

  async findAll(offset?: number, limit?: number, options?: FindManyOptions<Article>) {
    const where: FindManyOptions<Article>['where'] = {};
    let separateCount = 0;

    const [items, count] = await this.articlesRepository.findAndCount({
      where,
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit,
      relations: ['user', 'comments'],
      ...options
    });

    return {
      items,
      count: separateCount ? count : count + separateCount,
    }
  }


  async findOne(id: number) {
    const article = await this.articlesRepository.findOne(id, {
      relations: ['user', 'comments'],
    });
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articlesRepository.findOne(id);
    await this.articlesRepository.update(id, updateArticleDto);
    return article;
  }

  async remove(id: number) {
    const article = await this.articlesRepository.findOne(id);
    await this.articlesRepository.remove(article);
    return null;
  }
}
