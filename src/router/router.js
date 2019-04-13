import apiLoader from "./api/api";
import apisLoader from "./apis/apis";

const expressLoader = "express";

export default new Promise(async asyncExport => {
  const routerFn = async (db, catchEm, errorHandler) => {
    let [error, result] = await catchEm(
      Promise.all([import(expressLoader), apiLoader, apisLoader])
    );
    if (error) {
      console.log(errorHandler(error));
      return;
    }
    const [{ default: Router }, api, apis] = result;
    const router = Router();

    [error, result] = await catchEm(
      Promise.all([
        api(db, catchEm, errorHandler),
        apis(db, catchEm, errorHandler)
      ])
    );
    if (error) {
      console.log(errorHandler(error));
      return router;
    }
    const [apiMethod, apisMethod] = result;

    router.use("/api", apiMethod);
    router.use("/apis", apisMethod);
    return router;
  };
  asyncExport(routerFn);
});
