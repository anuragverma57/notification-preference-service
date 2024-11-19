import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
      envFilePath: '.env', // Path to the .env file
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().required(),
        RATE_LIMIT_MAX: Joi.number().default(100),
      }),
    }),
  ],
})
export class ConfigModule {}
