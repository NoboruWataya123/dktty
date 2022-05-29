import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentsRepository.create(createCommentDto);
    await this.commentsRepository.save(comment);
    return comment;
  }

  async findAll() {
    const comments = await this.commentsRepository.find();
    return comments;
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne(id);
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentsRepository.findOne(id);
    await this.commentsRepository.update(id, updateCommentDto);
    return comment;
  }

  async remove(id: number) {
    const comment = await this.commentsRepository.findOne(id);
    await this.commentsRepository.remove(comment);
    return null;
  }
}
