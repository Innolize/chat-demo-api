import { EntitySchema } from 'typeorm';

import { Chat } from '../../domain/chat.domain';

export const ChatSchema = new EntitySchema<Chat>({
  name: 'Chat',
  target: Chat,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
  },
  relations: {
    messages: {
      type: 'one-to-many',
      target: 'Message',
      joinColumn: true,
      inverseSide: 'chat',
    },
  },
});
