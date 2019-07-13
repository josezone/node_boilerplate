import { Express } from 'express-serve-static-core';

import { Server } from './app';
import { config } from './config/config';
import { db } from './config/db';
// import { Permission } from './modules/user/permission';
import { Consoler } from './utility/consoler';

async function startServer() {
    const connect = await db.connection();
    // const permission = new Permission();
    // permission.init();
    if(!connect){
        return;
    }
    const app: Express = Server.server();
    app.listen(config.PORT, () => Consoler.log(`Listening on port ${config.PORT}!`));
}

startServer();
