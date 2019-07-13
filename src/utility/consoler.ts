import { config } from '../config/config';

export class Consoler {
  // tslint:disable-next-line: no-any
  static log(value: any): void {
    if (config.NODE_ENV !== 'production') {
      console.log(value);
    }
  }
}
