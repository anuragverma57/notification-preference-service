import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preferences } from './preferences.schema';
import { CreatePreferencesDto } from './preferences.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('Preferences')
    private readonly preferencesModel: Model<Preferences>,
  ) {}

  async createPreferences(dto: CreatePreferencesDto): Promise<Preferences> {
    return this.preferencesModel.create(dto);
  }

  async getPreferences(userId: string): Promise<Preferences> {
    const preferences = await this.preferencesModel.findOne({ userId });
    if (!preferences) throw new NotFoundException('Preferences not found');
    return preferences;
  }

  async updatePreferences(userId: string, updates: any): Promise<Preferences> {
    const updated = await this.preferencesModel.findOneAndUpdate(
      { userId },
      updates,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Preferences not found');
    return updated;
  }

  async deletePreferences(userId: string): Promise<void> {
    const deleted = await this.preferencesModel.deleteOne({ userId });
    if (deleted.deletedCount === 0)
      throw new NotFoundException('Preferences not found');
  }
}
