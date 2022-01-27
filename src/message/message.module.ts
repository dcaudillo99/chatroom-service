import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageRepository } from './message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  controllers: [],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
