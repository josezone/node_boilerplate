import { Column, Entity } from 'typeorm';

import { Base } from '../base.model';
import { UserInterface } from '../user.model.i';

@Entity()
export class User extends Base implements UserInterface {
  @Column()
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  token!: string;

  @Column()
  status!: boolean;

  @Column()
  emailStatus!: boolean;
}
