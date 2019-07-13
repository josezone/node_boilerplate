import { Base } from '../base.model';
import { Permission } from './permission.model';
import { RolesInterface } from '../roles.model.i';
import { User } from './user.model';
import {
    Column,
    Entity,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity()
export class Roles extends Base implements RolesInterface {
    @Column()
    name!: string;

    @ManyToMany(type => Permission)
    @JoinTable()
    permission!: Permission[];

    @ManyToMany(type => User)
    @JoinTable()
    user!: User[];
}
