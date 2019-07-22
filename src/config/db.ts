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
export class Db implements DbInterface {
	@inject(ASYNC_LOADER) asyncLoader!: AsyncLoaderInterface;
	@inject(ERROR_HANDLER) errorHandler!: ErrorHandlerInterface;
	@inject(CONSOLER) consoler!: ConsolerInterface;

	settings: ConnectionOptions = {
		type: config.TYPEORM_CONNECTION,
		host: config.TYPEORM_HOST,
		port: config.TYPEORM_PORT,
		username: config.TYPEORM_USERNAME,
		password: config.TYPEORM_PASSWORD,
		database: config.TYPEORM_DATABASE,
		logging: true,
		synchronize: true,
		entities: [ process.cwd() + '/src/model/entity/*.ts' ],
		subscribers: [ process.cwd() + '/src/modules/user/*.ts' ],
		migrations: [ process.cwd() + '/src/migration/*.ts' ],
		cli: {
			entitiesDir: process.cwd() + '/src/model/entity',
			subscribersDir: process.cwd() + '/src/modules/user',
			migrationsDir: process.cwd() + '/src/migration',
		},
	};

	async connection() {
		// tslint:disable-next-line: no-any
		const [ error ]:any[] = await this.asyncLoader.load(createConnection(this.settings));
		if (error) {
			this.consoler.log(this.errorHandler.clean(error));
		}
	}
}
