import apiLoader from "./api/api";
import apisLoader from "./apis/apis";

const expressLoader = "express";
const asyncLoader = "../utility/asyncLoader";

export default new Promise(async (asyncExport, reject) => {
  const {default: catchEm} = await import(asyncLoader);

  const [error, result] = await catchEm(
    Promise.all([import(expressLoader), apiLoader, apisLoader])
  );
  if (error) {
    reject(error);
  }
  const [{ default: Router }, api, apis] = result;
  const router = Router();

  const routerFn = (db, errorHandler) => {
    router.use("/api", api(db, errorHandler));
    router.use("/apis", apis(db, errorHandler));
    return router;
  };
  asyncExport(routerFn);
});
