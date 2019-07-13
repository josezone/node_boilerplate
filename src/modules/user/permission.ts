import { injectable } from 'inversify';
import { PermissionInterface, PermissionObject } from './permission.i';

@injectable()
export class Permission implements PermissionInterface {
    permission: PermissionObject = {
        id: undefined,
        name: undefined,
    };
}