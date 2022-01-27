import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageSenderDto } from './dto/message-sender.dto';
import { Inject } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @Inject()
  messageService: MessageService;

  @WebSocketServer()
  server;

  @SubscribeMessage('all-messages')
  async handleFetchMessages(): Promise<void> {
    const messages: Message[] = await this.messageService.fetchMessages();
    this.server.emit('all-messages', messages);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() messageSenderDto: MessageSenderDto,
  ): Promise<void> {
    const message = await this.messageService.sendMessage(messageSenderDto);
    await this.handleFetchMessages();
    this.server.emit('message', message);
  }
}
