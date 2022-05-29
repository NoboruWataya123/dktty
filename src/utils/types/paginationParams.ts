import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParams {
  //   @IsOptional()
  //   @ApiProperty({
  //     description: 'Article Id',
  //     example: 1,
  //     default: 1,
  //   })
  //   @Type(() => Number)
  //   @IsNumber()
  //   startId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Offset',
    example: 0,
    default: 0,
  })
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Limit',
    example: 10,
    default: 10,
  })
  @Min(1)
  limit?: number;
}