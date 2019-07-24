import './config/ioc';

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

import { config } from './config/config';

class ContainerData {
  container: Container;

  constructor() {
    this.container = new Container();
    this.container.load(buildProviderModule());
    if (config.NODE_ENV === 'development') {
      const logger = makeLoggerMiddleware();
      this.container.applyMiddleware(logger);
    }
  }

  get getContainer() {
    return this.container;
  }
}

export const receptacle = new ContainerData();
