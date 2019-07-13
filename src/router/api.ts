import { Router } from 'express';
import { useExpressServer } from 'routing-controllers';
import { apiList } from '../modules/api';

const router = Router();

export function api() {
  useExpressServer(router, {
    controllers: apiList,
  });
  return router;
}
