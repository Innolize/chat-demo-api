import '@nestjs/platform-socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { CreateMessageDto } from '../application/dto/create-message.dto';
import { MessageService } from '../application/service/message.service';

@WebSocketGateway({
  transports: ['polling'],
  cors: { origin: '*' },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}
  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnected');
    return;
  }
  @WebSocketServer()
  server: Socket;

  afterInit(@ConnectedSocket() server: Socket) {
    console.log('init');
    return;
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected');
    return;
  }

  @SubscribeMessage('join room')
  joinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    console.log('entro al room: ' + room);
    client.join(room);
  }

  @SubscribeMessage('leave room')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.leave(room);
  }

  @SubscribeMessage('send message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateMessageDto,
  ) {
    const message = await this.messageService.save({
      user_id: body.user_id,
      chat_id: body.chat_id,
      message: body.message,
    });

    const messageResponse = await this.messageService.findOne(message.id);

    const CHAT_ID = body.chat_id.toString();

    this.server.to(CHAT_ID).emit('new chat message', messageResponse);
  }
}
