import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(200, { message: 'Name is too long' })
    @MinLength(1, { message: 'Name is too short' })
    @ApiProperty({ description: "User Name", nullable: false })
    firstName: string;
    
    @IsNotEmpty()
    @MaxLength(200, { message: 'LastName is too long' })
    @MinLength(1, { message: 'LastName is too short' })
    @ApiProperty({ description: "User LastName", nullable: false })
    lastName: string;
    
    @IsEmail()
    @ApiProperty({ description: "User Email", nullable: false })
    email: string;
    
    @IsNotEmpty()
    @MaxLength(200, { message: 'Password is too long' })
    @MinLength(8, { message: 'Password is too short' })
    @ApiProperty({ description: "User Password", nullable: false, minLength: 8 })
    password: string;
}
