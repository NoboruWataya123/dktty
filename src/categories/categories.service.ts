import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    await this.categoriesRepository.save(category);
    return category;
  }

  async findAll() {
    const categories = await this.categoriesRepository.find({
      relations: ['articles'],
    });
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id,
      {
        relations: ['articles'],
      });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne(id);
    await this.categoriesRepository.update(id, updateCategoryDto);
    return category;
  }

  async remove(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    await this.categoriesRepository.remove(category);
    return null;
  }
}
