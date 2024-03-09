import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IChatRepository } from '../../application/repository/chat.repository';
import { Chat } from '../../domain/chat.domain';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async save(): Promise<Chat> {
    return await this.chatRepository.save({});
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatRepository.find({
      relations: {
        messages: {
          user: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Chat> {
    return await this.chatRepository.findOne({
      where: { id },
      relations: { messages: true },
    });
  }
}
