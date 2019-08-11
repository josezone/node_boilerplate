import { transformAndValidate } from 'class-transformer-validator';
import { IsEmail, IsString } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { BaseMiddleware } from 'inversify-express-utils';

import { VALIDATION_LOGIN } from '../../../const/error';
import {
  ASYNC_LOADER,
  LOGIN_VALIDATOR,
  VALIDATOR_ERROR,
} from '../../../const/types';
import { AsyncLoaderInterface } from '../../../utility/asyncLoader.interface';
import { ValidatorErrorInterface } from '../../../utility/handleValidatorError.interface';

class Validate {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

@provide(LOGIN_VALIDATOR)
class LoginValidator extends BaseMiddleware {
  @inject(ASYNC_LOADER) private asyncLoader!: AsyncLoaderInterface;
  @inject(VALIDATOR_ERROR) private validatorError!: ValidatorErrorInterface;
  async handler(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await this.asyncLoader.load(
      transformAndValidate(Validate, req.body)
    );
    if (error) {
      this.validatorError.handle(error, VALIDATION_LOGIN, res);
    } else {
      next();
    }
  }
}
