import { Application } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import {buildProviderModule} from 'inversify-binding-decorators';
import "./config/ioc";

export class Server {
  static async server(): Promise<Application> {
    const container = new Container();
    container.load(buildProviderModule());
    const app = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });
    const server = app.build();
    return server;
  }
}
