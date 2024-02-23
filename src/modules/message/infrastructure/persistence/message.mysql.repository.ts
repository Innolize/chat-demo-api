import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from '../../application/dto/create-message.dto';
import { IMessageRepository } from '../../application/repository/message.repository';
import { Message } from '../../domain/message.domain';

export class MessageMySqlRepository implements IMessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }
  async findOne(id: number): Promise<Message> {
    return this.messageRepository.findOneBy({ id });
  }
  async save(message: CreateMessageDto): Promise<Message> {
    return this.messageRepository.save(message);
  }
}
