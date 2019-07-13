import { Router } from 'express';
import { useExpressServer } from 'routing-controllers';

const router = Router();

export function apis() {
  useExpressServer(router, {
    controllers: [__dirname + '../modules/apis/**/*.js'],
  });
  return router;
}
