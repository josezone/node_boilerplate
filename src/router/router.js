import apiLoader from "./api/api";
import apisLoader from "./apis/apis";

const expressLoader = "express";
const enableJWTLoader = "../middlewares/enableJWT";

export default new Promise(async function routers(asyncExport) {
  const result = await Promise.all([
    import(expressLoader),
    apiLoader,
    apisLoader,
    import(enableJWTLoader)
  ]);

  const [{ default: Router }, api, apis, { default: enableJWT }] = result;
  const router = Router();

  function routerFn(db) {
    router.use("/api", api(db));
    router.use("/apis", enableJWT(), apis(db));
    return router;
  }
  asyncExport(routerFn);
  return true;
});
