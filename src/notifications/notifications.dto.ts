import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  userId: string;

  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: string;

  @IsEnum(['email', 'sms', 'push'])
  channel: string;

  @IsObject()
  content: {
    subject: string;
    body: string;
  };

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
