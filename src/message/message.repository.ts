import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';
import { MessageSenderDto } from './dto/message-sender.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async getAll(): Promise<Message[]> {
    return this.find();
  }

  async createMessage(messageSenderDto: MessageSenderDto): Promise<Message> {
    const { message, sender } = messageSenderDto;

    const myMessage = this.create({
      message,
      sender,
    });

    try {
      return await this.save(myMessage);
    } catch (e) {
      console.log(e);
    }
  }
}
