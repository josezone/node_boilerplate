import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import { Express } from 'express-serve-static-core';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { stream } from '../config/logger';

export function middleware(app: Express): void {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('combined', { stream }));
}
