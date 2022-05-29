import { IsEmail, IsString, IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'mail@mail.com' })
  email: string;

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

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: "User Password", nullable: false })
  password: string;

//   @ApiProperty({
//     description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
//     example: '+123123123123'
//   })
//   @IsString()
//   @IsNotEmpty()
//   @Matches(/^\+[1-9]\d{1,14}$/)
//   phoneNumber: string;
}

export default RegisterDto;