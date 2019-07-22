import { provide } from 'inversify-binding-decorators';

import { CUSTOM_ERROR } from '../const/types';
import { CustomErrorInterface } from './customError.interface';

@provide(CUSTOM_ERROR)
export class CustomError extends Error implements CustomErrorInterface {
  statusCode!: number;
  description!: string;
  setInfo(statusCode: number, description: string): CustomError {
    this.statusCode = statusCode;
    this.description = description;
    return this;
  }
}
