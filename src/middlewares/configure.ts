import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as morgan from 'morgan';

import { LoggerInterface } from '../config/logger.interface';
import { LOGGER, MIDDLEWARES } from '../const/types';
import { ConfigureMiddlewaresInterface } from './configure.interface';

@provide(MIDDLEWARES)
export class ConfigureMiddlewares implements ConfigureMiddlewaresInterface {
  @inject(LOGGER) logger!: LoggerInterface;

  middleware(server: InversifyExpressServer): void {
    server.setConfig(app => {
      app.use(helmet());
      app.use(compression());
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(morgan('combined', { stream: this.logger.log }));
    });
  }
}
