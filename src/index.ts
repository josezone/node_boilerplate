import { AsyncLoader } from './utility/asyncLoader';
import { config } from './config/config';
import { Consoler } from './utility/consoler';
import { createConnection } from 'typeorm';
import { ErrorHandler } from './utility/errorHandler';
import { Express } from 'express-serve-static-core';
import { Server } from './app';
import 'reflect-metadata';

async function startServer() {
    const [error] = await AsyncLoader.load(createConnection());
    if (error) {
        Consoler.log(ErrorHandler.clean(error));
        return;
    }
    const app: Express = Server.server();
    app.listen(config.PORT, () => Consoler.log(`Listening on port ${config.PORT}!`));

}

startServer();
