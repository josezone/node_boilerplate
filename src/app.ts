import * as express from 'express';
import { Express } from 'express-serve-static-core';

import { Strategies } from './config/jwtStrategy';
import { middleware } from './middlewares/configure';
import { routerFn } from './router';

export class Server {
  static server(): Express {
    const app = express();
    middleware(app);
    const passportStrategy = new Strategies(app);
    passportStrategy.jwtStrategy();
    app.use('/v1', routerFn());
    return app;
  }
}
