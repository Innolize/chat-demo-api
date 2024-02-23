import { Chat } from '../../domain/chat.domain';

export const CHAT_REPOSITORY = 'CHAT_REPOSITORY';

export interface IChatRepository {
  save(chat: Chat): Promise<Chat>;
  findAll(): Promise<Chat[]>;
  findOne(id: number): Promise<Chat>;
}
