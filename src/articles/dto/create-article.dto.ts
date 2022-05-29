import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateArticleDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    userId: number;
    @ApiProperty()
    categoryId: number;
}
