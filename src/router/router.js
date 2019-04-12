import apiLoader from "./api/api";
import apisLoader from "./apis/apis";

const asyncLoader = "../utility/asyncLoader";
const expressLoader = "express";

export default new Promise(async asyncExport => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, [{ default: Router }, api, apis]] = await catchEm(
    Promise.all([import(expressLoader), apiLoader, apisLoader])
  );
  const router = Router();
  const routerFn = () => {
    router.use("/api", api());
    router.use("/apis", apis());
    return router;
  };
  asyncExport(routerFn);
});
