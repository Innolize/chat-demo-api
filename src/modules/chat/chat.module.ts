import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CHAT_REPOSITORY } from './application/repository/chat.repository';
import { ChatRepository } from './infrastructure/persistence/chat.mysql.repository';
import { ChatSchema } from './infrastructure/persistence/chat.schema';
import { ChatController } from './interface/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatSchema])],
  controllers: [ChatController],
  providers: [
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatRepository,
    },
  ],
})
export class ChatModule {}
