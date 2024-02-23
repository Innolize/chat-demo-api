import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { CreateMessageDto } from '../application/dto/create-message.dto';
import { MessageService } from '../application/service/message.service';

@Controller('message')
export class MessageController {
  constructor(
    @Inject(MessageService)
    private readonly messageService: MessageService,
  ) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get()
  findOne(id: number) {
    return this.messageService.findOne(id);
  }

  @Post()
  save(@Body() message: CreateMessageDto) {
    return this.messageService.save(message);
  }
}
