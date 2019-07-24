import { InversifyExpressServer } from 'inversify-express-utils';

export interface ConfigureMiddlewaresInterface {
  middleware(app: InversifyExpressServer): void;
}
