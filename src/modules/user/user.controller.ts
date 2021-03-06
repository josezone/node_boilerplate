import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestParam,
} from 'inversify-express-utils';

import {
  LOGIN_VALIDATOR,
  REGISTER_VALIDATOR,
  USER_SERVICE,
  VALIDATOR,
} from '../../const/types';
import { UserServiceInterface } from './services/user.interface';

@controller('/user')
class UserController extends BaseHttpController {
  @inject(USER_SERVICE) private userService!: UserServiceInterface;

  @httpPost('/login', LOGIN_VALIDATOR)
  private login(
    @requestParam('email') email: string,
    @requestParam('password') password: string,
    res: Response,
    next: NextFunction
  ): void {
    this.userService.login(email, password);
  }
}
