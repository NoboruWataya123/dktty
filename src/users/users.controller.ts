import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { IdUserDto } from './dto/id-user.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@ApiTags('Users')
@ApiSecurity('bearer', ['jwt'])
@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Creates a new User" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: IdUserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Show a list of Users" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateUserDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Finds a User by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Updates a found User" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes a found User" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Not Found" })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
