import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { getRepository, Repository } from 'typeorm';

import { PASSWORD, USER_SERVICE } from '../../../const/types';
import { PermissionInterface } from '../../../model/permission.model.i';
import { RolesInterface } from '../../../model/roles.model.i';
import { UserInterface } from '../../../model/user.model.i';
import { PasswordInterface } from '../../../utility/password.interface';
import { UserServiceInterface } from './user.interface';

@provide(USER_SERVICE)
class UserService implements UserServiceInterface {
  @inject(PASSWORD) private passwordService!: PasswordInterface;
  private userRepository: Repository<any>;
  private rolesRepository: Repository<RolesInterface>;
  private permissionRepository: Repository<PermissionInterface>;

  constructor() {
    this.userRepository = getRepository('User');
    this.rolesRepository = getRepository('Roles');
    this.permissionRepository = getRepository('Roles');
  }

  register(email: string) {
    return 'The code is here';
  }

  completeRegister(password: string, token: string) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['password', 'id'],
      where: { email },
    });
    console.log('user')
    console.log(user)
  }

  forgotPassword(email: string) {}

  resetPassword(email: string, password: string, token: string) {}

  changePassword(id: number, password: string, oldPassword: string) {}
}
