import { EntitySchema } from 'typeorm';

import { Message } from '../../domain/message.domain';

export const MessageSchema = new EntitySchema<Message>({
  name: 'Message',
  target: Message,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    message: {
      type: 'varchar',
    },
    user_id: {
      type: 'int',
    },
    chat_id: {
      type: 'int',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
