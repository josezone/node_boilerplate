import { createConnection, ConnectionOptions } from 'typeorm';

import { AsyncLoader } from '../utility/asyncLoader';
import { Consoler } from '../utility/consoler';
import { ErrorHandler } from '../utility/errorHandler';
import { DbInterface } from './db.i';
import { config } from './config';

class Db implements DbInterface {
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

	private db: any;
	async connection() {
		const [ error, connection ] = await AsyncLoader.load(createConnection(this.settings));
		if (error) {
			Consoler.log(ErrorHandler.clean(error));
			return;
		}
		this.db = connection;
		return connection;
	}
	get connect() {
		return this.db;
	}
}

export const db = new Db();
