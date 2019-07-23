import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestParam } from 'inversify-express-utils';

import { LOGIN_VALIDATOR, REGISTER_VALIDATOR, USER_SERVICE } from '../../const/types';
import { UserServiceInterface } from './services/user.interface';

@controller('/user')
class UserController extends BaseHttpController {
  @inject(USER_SERVICE) private userService!: UserServiceInterface;

  @httpPost('/register', REGISTER_VALIDATOR)
  private register(
    @requestParam('email') email: string,
    res: Response,
    next: NextFunction
  ): string {
    return this.userService.register(email);
  }

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
