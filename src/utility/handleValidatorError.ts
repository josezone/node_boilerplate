import { Response } from 'express';
import { provide } from 'inversify-binding-decorators';

import * as Joi from '@hapi/joi';

import { VALIDATOR_ERROR } from '../const/types';

@provide(VALIDATOR_ERROR)
class ValidatorError {
  handle(
    result: Joi.ValidationResult<{}>,
    developerCode: string,
    res: Response
  ) {
    const message: string[] = result.error.details.map(items => items.message);
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
