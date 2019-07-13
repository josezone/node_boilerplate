import { api } from './api';
import { apis } from './apis';
import { enableJWT } from '../middlewares/enableJWT';
import { Router } from 'express';

const router = Router();

export function routerFn() {
  router.use('/api', api());
  router.use('/apis', enableJWT(), apis());
  return router;
}
