import 'reflect-metadata';

import { Application } from 'express';

import { Server } from './app';
import { config } from './config/config';

async function startServer() {
  const app: Application = await Server.server();
  app.listen(config.PORT, () =>
    console.log(`Listening on port ${config.PORT}!`)
  );
}

startServer();
