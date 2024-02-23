import { Message } from '@/modules/message/domain/message.domain';

export class Chat {
  id: number;
  messages: Message[];
}
