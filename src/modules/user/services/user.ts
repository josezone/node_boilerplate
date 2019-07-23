import { provide } from 'inversify-binding-decorators';

import { USER_SERVICE } from '../../../const/types';
import { UserServiceInterface } from './user.interface';

@provide(USER_SERVICE)
class UserService implements UserServiceInterface {
  register(email: string) {
    return 'The code is here';
  }

  completeRegister(pasword: string, token: string) {}

  login(email: string, pasword: string) {}

  forgotPassword(email: string) {}

  resetPassword(email: string, pasword: string, token: string) {}

  changePassword(id: number, pasword: string, oldPasword: string) {}
}
