import appLoader from "./app/app";
import appsLoader from "./apps/apps";

const asyncLoader = "../utility/asyncLoader";
const expressLoader = "express";

export default new Promise(async asyncExport => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, [{ default: Router }, app, apps]] = await catchEm(
    Promise.all([import(expressLoader), appLoader, appsLoader])
  );
  const router = Router();
  const routerFn = () => {
    router.use("/app", app());
    router.use("/apps", apps());
    return router;
  };
  asyncExport(routerFn);
});
