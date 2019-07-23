import { provide } from 'inversify-binding-decorators';

import { config } from '../config/config';
import { CONSOLER } from '../const/types';
import { ConsolerInterface } from './consoler.interface';

@provide(CONSOLER)
class Consoler implements ConsolerInterface {
  // tslint:disable-next-line: no-any
  log(value: any): void {
    if (config.NODE_ENV !== 'production') {
      console.log(value);
    }
  }
}
