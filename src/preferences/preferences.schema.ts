import { Schema, Document } from 'mongoose';

export const PreferencesSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  preferences: {
    marketing: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: false },
    updates: { type: Boolean, default: false },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'never'],
      default: 'never',
    },
    channels: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
  },
  timezone: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export interface Preferences extends Document {
  userId: string;
  email: string;
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: string;
    channels: { email: boolean; sms: boolean; push: boolean };
  };
  timezone: string;
  lastUpdated: Date;
  createdAt: Date;
}
