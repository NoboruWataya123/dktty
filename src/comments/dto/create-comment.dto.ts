import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    articleId: number;
}
