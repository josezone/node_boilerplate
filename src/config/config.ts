import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

dotenv.config();

interface ConfigInterface {
  PORT: string;
  NODE_ENV: string;
  SWAGGER_USER: string;
  SWAGGER_PASSWORD: string;
  FACEBOOK_APP_ID: string;
  FACEBOOK_APP_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  JWT_SECRET: string;
  TYPEORM_HOST: string;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TYPEORM_PORT: number;
  TYPEORM_SYNCHRONIZE: boolean;
  TYPEORM_CONNECTION: 'mysql';
}

export const config: ConfigInterface = {
  PORT: process.env.PORT || '',
  NODE_ENV: process.env.NODE_ENV || '',
  SWAGGER_USER: process.env.SWAGGER_USER || '',
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD || '',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  TYPEORM_HOST: process.env.TYPEORM_HOST || '',
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME || '',
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD || '',
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE || '',
  TYPEORM_PORT: process.env.TYPEORM_PORT
    ? Number(process.env.TYPEORM_PORT)
    : 3306,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE ? true : false,
  TYPEORM_CONNECTION: 'mysql',
};
