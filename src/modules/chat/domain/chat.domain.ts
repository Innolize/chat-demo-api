import { Message } from '@/modules/message/domain/message.domain';
import { User } from '@/modules/user/domain/user.domain';

export class Chat {
  id: number;
  user_id: number;
  messages?: Message[];
  user?: User[];
}
