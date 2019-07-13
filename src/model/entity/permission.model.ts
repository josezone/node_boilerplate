import { Base } from '../base.model';
import { PermissionInterface } from '../permission.model.i';
import {
    Column,
    Entity,
} from 'typeorm';

@Entity()
export class Permission extends Base implements PermissionInterface {
    @Column()
    name!: string;
}
