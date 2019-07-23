import * as bcrypt from 'bcrypt';
import { provide } from 'inversify-binding-decorators';

import { PASSWORD } from '../const/types';
import { PasswordInterface } from './password.interface';

@provide(PASSWORD)
class Password implements PasswordInterface {
  generatePassword(data: string, rounds: number): Promise<Error | string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, rounds, (err: Error, hashed: string) => {
        if (err) {
          reject(err);
        }
        resolve(hashed);
      });
    });
  }

  comparePassword(password: string, hash: string): Promise<Error | boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err: Error, result: boolean) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
