import { Injectable } from '@nestjs/common';
import { MessageSenderDto } from './dto/message-sender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
  ) {}

  async fetchMessages(): Promise<Message[]> {
    return await this.messageRepository.getAll();
  }

  async sendMessage(messageSenderDto: MessageSenderDto) {
    return this.messageRepository.createMessage(messageSenderDto);
  }
}
