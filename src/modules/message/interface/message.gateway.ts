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

@WebSocketGateway({
  transports: ['polling'],
  cors: { origin: '*' },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateMessageDto,
  ) {
    const message = {
      message: body.message,
      id: client.id,
      name: 'Jane Doe',
      avatar: 'https://picsum.photos/200',
    };
    this.server.to(body.chat_id).emit('new chat message', message);
  }
}

interface CreateMessageDto {
  message: string;
  chat_id: string;
}
