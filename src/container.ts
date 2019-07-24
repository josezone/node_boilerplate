import './config/ioc';

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';

import { config } from './config/config';

export class ContainerData {
  static inverifyContainer(): Container {
    const container: Container = new Container();
    container.load(buildProviderModule());
    if (config.NODE_ENV === 'development') {
      const logger = makeLoggerMiddleware();
      container.applyMiddleware(logger);
    }
    return container;
  }
}
