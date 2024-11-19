import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationLogSchema } from './notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NotificationLog', schema: NotificationLogSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
