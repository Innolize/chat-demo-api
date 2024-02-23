import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USER_REPOSITORY } from './application/repository/user.repository';
import { UserMySqlRepository } from './infrastructure/persistence/user.mysql.repository';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { UserController } from './interface/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserMySqlRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
