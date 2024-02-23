import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsNumber()
  chat_id: number;

  @IsNumber()
  user_id: number;
}
