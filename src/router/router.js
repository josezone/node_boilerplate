import apiLoader from "./api/api";
import apisLoader from "./apis/apis";

const expressLoader = "express";

export default new Promise(async function routers(asyncExport) {
  const result = await Promise.all([
    import(expressLoader),
    apiLoader,
    apisLoader
  ]);

  const [{ default: Router }, api, apis] = result;
  const router = Router();

  function routerFn(db, errorHandler) {
    router.use("/api", api(db, errorHandler));
    router.use("/apis", apis(db, errorHandler));
    return router;
  }
  asyncExport(routerFn);
  return true;
});
