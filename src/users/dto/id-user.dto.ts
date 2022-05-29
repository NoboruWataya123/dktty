import { ApiProperty } from "@nestjs/swagger";

export class IdUserDto {
    @ApiProperty({ description: "User Id", nullable: false })
    id: number;
}
