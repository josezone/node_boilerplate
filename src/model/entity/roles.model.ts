import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Base } from '../base.model';
import { RolesInterface } from '../roles.model.i';
import { Permission } from './permission.model';
import { User } from './user.model';

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
