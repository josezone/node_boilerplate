import { createConnection } from 'typeorm';

import { AsyncLoader } from '../utility/asyncLoader';
import { Consoler } from '../utility/consoler';
import { ErrorHandler } from '../utility/errorHandler';
import { DbInterface } from './db.i';

class Db implements DbInterface {
	private db: any;
	async connection() {
		const [ error, connection ] = await AsyncLoader.load(createConnection());
		if (error) {
			Consoler.log(ErrorHandler.clean(error));
			return;
		}
		this.db = connection;
		return connection;
	}
	get connect(){
		return this.db;
	} 
}

export const db = new Db();
