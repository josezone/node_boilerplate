import { inject, injectable } from 'inversify';

import { PermissionInterface } from './permission.i';
import { RolesInterface } from './roles.i';
import { TYPES } from './types';
import { UserInterface, UserObject } from './user.i';

@injectable()
export class User implements UserInterface {
    // @inject(TYPES.Roles) private roles: RolesInterface;
    // @inject(TYPES.Permission) private permission: PermissionInterface;

    user: UserObject = {
        id: undefined,
        email: undefined,
        password: null,
        status: undefined,
        emailStatus: undefined,
    };

}