import { injectable } from 'inversify';

import { RolesInterface, RolesObject } from './roles.i';

@injectable()
export class Roles implements RolesInterface {
	roles: RolesObject = {
		id: undefined,
		name: undefined,
	};
}
