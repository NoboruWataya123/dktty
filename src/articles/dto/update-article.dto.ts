import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    @ApiProperty()
    content: string;
}
