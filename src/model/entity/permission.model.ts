import { Column, Entity } from 'typeorm';

import { Base } from '../base.model';
import { PermissionInterface } from '../permission.model.i';

@Entity()
export class Permission extends Base implements PermissionInterface {
    @Column()
    name!: string;
}
