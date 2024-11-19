import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './preferences.dto';

@Controller('api/preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() dto: CreatePreferencesDto) {
    return this.preferencesService.createPreferences(dto);
  }

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.preferencesService.getPreferences(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updates: any) {
    return this.preferencesService.updatePreferences(userId, updates);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.preferencesService.deletePreferences(userId);
  }
}
