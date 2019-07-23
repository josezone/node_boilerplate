import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';

import * as Joi from '@hapi/joi';

import { VALIDATION_REGISTER } from '../../../const/error';
import { REGISTER_VALIDATOR, VALIDATOR_ERROR } from '../../../const/types';
import { ValidatorErrorInterface } from '../../../utility/handleValidatorError.interface';

@provide(REGISTER_VALIDATOR)
class RegisterValidator extends BaseMiddleware {
  @inject(VALIDATOR_ERROR) private validatorError!: ValidatorErrorInterface;

  private schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
  });

  handler(req: Request, res: Response, next: NextFunction) {
    const result: Joi.ValidationResult<{}> = Joi.validate(
      req.body,
      this.schema
    );
    if (result.error) {
      this.validatorError.handle(result, VALIDATION_REGISTER, res);
    } else {
      next();
    }
  }
}
