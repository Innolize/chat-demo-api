import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../application/dto/create-user.dto';
import { IUserRepository } from '../application/repository/user.repository';
import { User } from '../domain/user.domain';

@Injectable()
export class UserMySqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  async save(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
