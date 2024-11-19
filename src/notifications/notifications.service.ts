import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './notifications.schema';
import { SendNotificationDto } from './notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('NotificationLog')
    private readonly notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<NotificationLog> {
    // Simulate notification sending logic
    const status = Math.random() > 0.1 ? 'sent' : 'failed'; // 90% success rate
    const sentAt = status === 'sent' ? new Date() : null;

    const log = await this.notificationLogModel.create({
      userId: dto.userId,
      type: dto.type,
      channel: dto.channel,
      status,
      sentAt,
      failureReason: status === 'failed' ? 'Delivery failed' : null,
      metadata: dto.metadata,
    });

    return log;
  }

  async getNotificationLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getNotificationStats(type?: string): Promise<any> {
    const match = type ? { type } : {};
    return this.notificationLogModel.aggregate([
      { $match: match },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  }
}
