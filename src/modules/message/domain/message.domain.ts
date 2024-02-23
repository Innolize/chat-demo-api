import { User } from '@/modules/user/domain/user.domain';

export class Message {
  id: number;
  message: string;
  user_id: number;
  chat_id: number;
  user: User;
}
