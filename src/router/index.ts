import { Router } from 'express';

import { enableJWT } from '../middlewares/enableJWT';
import { api } from './api';
import { apis } from './apis';

const router = Router();

export function routerFn() {
  router.use('/api', api());
  router.use('/apis', enableJWT(), apis());
  return router;
}
