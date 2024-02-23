import { Message } from '../../domain/message.domain';
import { CreateMessageDto } from '../dto/create-message.dto';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export interface IMessageRepository {
  findAll(): Promise<Message[]>;
  findOne(id: number): Promise<Message>;
  save(message: CreateMessageDto): Promise<Message>;
}
