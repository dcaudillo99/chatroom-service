import { IsString } from 'class-validator';

export class MessageSenderDto {
  @IsString()
  message: string;

  @IsString()
  sender: string;

  @IsString()
  recipient: string;
}
