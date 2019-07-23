import { provide } from 'inversify-binding-decorators';

import { DEEP_CLONE } from '../const/types';
import { DeepCloneInterface } from './deepClone.interface';

@provide(DEEP_CLONE)
class DeepClone implements DeepCloneInterface {
  clone(cloneObject: {}): {} {
    return JSON.parse(JSON.stringify(cloneObject));
  }
}
