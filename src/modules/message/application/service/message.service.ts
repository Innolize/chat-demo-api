import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { USER_EXCEPTIONS } from '@/modules/user/application/exceptions/message.constants';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '@/modules/user/application/repository/user.repository';

import { Message } from '../../domain/message.domain';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MESSAGE_EXCEPTIONS } from '../exceptions/message.constants';
import {
  IMessageRepository,
  MESSAGE_REPOSITORY,
} from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: IMessageRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  findAll(): Promise<Message[]> {
    return this.messageRepository.findAll();
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(MESSAGE_EXCEPTIONS.MESSAGE_NOT_FOUND);
    }

    return message;
  }

  async save(message: CreateMessageDto): Promise<Message> {
    const user = await this.userRepository.findOne(message.user_id);

    if (!user) {
      throw new NotFoundException(USER_EXCEPTIONS.USER_NOT_FOUND);
    }

    return this.messageRepository.save(message);
  }
}
