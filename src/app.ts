import './config/ioc';

import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { DbInterface } from './config/db.interface';
import { DB, MIDDLEWARES } from './const/types';
import { ContainerData } from './container';
import { ConfigureMiddlewaresInterface } from './middlewares/configure.interface';

export class Server {
  static async server(): Promise<Application> {
    const container: Container =ContainerData.inverifyContainer();
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
