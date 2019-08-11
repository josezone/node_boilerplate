import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { provide } from 'inversify-binding-decorators';

import { VALIDATOR_ERROR } from '../const/types';

@provide(VALIDATOR_ERROR)
class ValidatorError {
  handle(result: ValidationError[], developerCode: string, res: Response) {
    const message: string[] = result.map(
      items => items.constraints[Object.keys(items.constraints)[0]]
    );
    res.status(412).json({
      error: {
        message,
        developerCode,
        code: 412,
        developerMessage: 'validation error',
      },
    });
  }
}
