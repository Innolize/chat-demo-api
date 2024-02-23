import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { CreateUserDto } from '../application/dto/create-user.dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../application/repository/user.repository';
import { User } from '../domain/user.domain';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userRepository.findOne(+id);
  }

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
