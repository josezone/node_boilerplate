import { Container } from 'inversify';

import { Permission } from './permission';
import { PermissionInterface } from './permission.i';
import { Roles } from './roles';
import { RolesInterface } from './roles.i';
import { TYPES } from './types';
import { User } from './user';
import { UserInterface } from './user.i';

const userContainer = new Container();
userContainer.bind<PermissionInterface>(TYPES.Permission).to(Permission);
userContainer.bind<RolesInterface>(TYPES.Roles).to(Roles);
userContainer.bind<UserInterface>(TYPES.User).to(User);

export { userContainer };