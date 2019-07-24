import { Application } from 'express';
import { Container, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { InversifyExpressServer } from 'inversify-express-utils';

import { DbInterface } from '../config/db.interface';
import { DB, MIDDLEWARES, SERVER } from '../const/types';
import { receptacle } from '../container';
import { ConfigureMiddlewaresInterface } from '../middlewares/configure.interface';
import { ServerInterface } from './app.interface';

@provide(SERVER)
class Server implements ServerInterface {
  @inject(DB) private db!: DbInterface;
  @inject(MIDDLEWARES)
  private configureMiddleware!: ConfigureMiddlewaresInterface;

  async server(): Promise<Application> {
    const container: Container = receptacle.getContainer;
    await this.db.connection();
    const app: InversifyExpressServer = new InversifyExpressServer(
      container,
      null,
      { rootPath: '/api/v1' }
    );
    this.configureMiddleware.middleware(app);
    const server: Application = app.build();
    return server;
  }
}
