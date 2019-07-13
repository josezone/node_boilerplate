import { Base } from '../base.model';
import { UserInterface } from '../user.model.i';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class User extends Base implements UserInterface {
  @Column()
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  status!: boolean;

  @Column()
  emailStatus!: boolean;
}
