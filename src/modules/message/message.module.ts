import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { MESSAGE_REPOSITORY } from './application/repository/message.repository';
import { MessageService } from './application/service/message.service';
import { MessageMySqlRepository } from './infrastructure/persistence/message.mysql.repository';
import { MessageSchema } from './infrastructure/persistence/message.schema';
import { MessageController } from './interface/message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageSchema]), UserModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessageMySqlRepository,
    },
  ],
})
export class MessageModule {}
