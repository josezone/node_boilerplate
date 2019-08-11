import { ValidationError } from 'class-validator';
import { Response } from 'express';

export interface ValidatorErrorInterface {
  handle(
    result: ValidationError[],
    developerCode: string,
    res: Response
  ): void;
}
