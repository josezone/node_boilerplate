import 'reflect-metadata';

import { Application } from 'express';

import { Server } from './app';
import { config } from './config/config';
import { db } from './config/db';
import { Consoler } from './utility/consoler';

async function startServer() {
    const connect = await db.connection();
    if(!connect){
        return;
    }
    const app: Application = await Server.server();
    app.listen(config.PORT, () => Consoler.log(`Listening on port ${config.PORT}!`));
}

startServer();
