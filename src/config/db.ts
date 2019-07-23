import { createConnection, ConnectionOptions } from 'typeorm';

import { DbInterface } from './db.interface';
import { config } from './config';
import { inject } from 'inversify';
import { ASYNC_LOADER, ERROR_HANDLER, CONSOLER, DB } from '../const/types';
import { AsyncLoaderInterface } from '../utility/asyncLoader.interface';
import { ErrorHandlerInterface } from '../utility/errorHandler.interface';
import { ConsolerInterface } from '../utility/consoler.interface';
import { provide } from 'inversify-binding-decorators';

@provide(DB)
class Db implements DbInterface {
  @inject(ASYNC_LOADER) private asyncLoader!: AsyncLoaderInterface;
  @inject(ERROR_HANDLER) private errorHandler!: ErrorHandlerInterface;
  @inject(CONSOLER) private consoler!: ConsolerInterface;

  settings: ConnectionOptions = {
    type: config.TYPEORM_CONNECTION,
    host: config.TYPEORM_HOST,
    port: config.TYPEORM_PORT,
    username: config.TYPEORM_USERNAME,
    password: config.TYPEORM_PASSWORD,
    database: config.TYPEORM_DATABASE,
    logging: true,
    synchronize: true,
    entities: [__dirname + '/../model/entity/*.ts'],
    subscribers: [__dirname + '/../modules/user/*.ts'],
    migrations: [__dirname + '/../migration/*.ts'],
    cli: {
      entitiesDir: __dirname + '/../model/entity',
      subscribersDir: __dirname + '/../modules/user',
      migrationsDir: __dirname + '/../migration',
    },
  };

  async connection() {
    // tslint:disable-next-line: no-any
    const [error, connection]: any[] = await this.asyncLoader.load(
      createConnection(this.settings)
	);
    if (error) {
      this.consoler.log(this.errorHandler.clean(error));
    }
  }
}
