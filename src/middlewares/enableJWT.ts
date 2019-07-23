import { provide } from 'inversify-binding-decorators';
import { authenticate, Authenticator } from 'passport';

import { ENABLE_JWT } from '../const/types';
import { EnableJWTInterface } from './enableJWT.interface';

@provide(ENABLE_JWT)
class EnableJWT implements EnableJWTInterface {
  enableJWT(): Authenticator {
    return authenticate('jwt', { session: false });
  }
}
