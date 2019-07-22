import './config/ioc';

import { Application } from 'express';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyExpressServer } from 'inversify-express-utils';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

import { DbInterface } from './config/db.interface';
import { DB, MIDDLEWARES } from './const/types';
import { ConfigureMiddlewaresInterface } from './middlewares/configure.interface';
import { config } from './config/config';

export class Server {
  static async server(): Promise<Application> {
    const container: Container = new Container();
    container.load(buildProviderModule());
    if (config.NODE_ENV === 'development') {
      const logger = makeLoggerMiddleware();
      container.applyMiddleware(logger);
    }
    const db: DbInterface = container.get(DB);
    await db.connection();
    const app: InversifyExpressServer = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api/v1' }
    );
    const configureMiddleware: ConfigureMiddlewaresInterface = container.get(
      MIDDLEWARES
    );
    configureMiddleware.middleware(app);
    const server: Application = app.build();
    return server;
  }
}
