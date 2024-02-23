import { Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { CHAT_REPOSITORY } from '../application/repository/chat.repository';
import { ChatRepository } from '../infrastructure/persistence/chat.mysql.repository';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository,
  ) {}

  @Get()
  findAll() {
    return this.chatRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chatRepository.findOne(id);
  }

  @Post()
  save() {
    return this.chatRepository.save();
  }
}
