import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './notifications.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  sendNotification(@Body() dto: SendNotificationDto) {
    return this.notificationsService.sendNotification(dto);
  }

  @Get(':userId/logs')
  getNotificationLogs(@Param('userId') userId: string) {
    return this.notificationsService.getNotificationLogs(userId);
  }

  @Get('stats')
  getStats(@Query('type') type: string) {
    return this.notificationsService.getNotificationStats(type);
  }
}
