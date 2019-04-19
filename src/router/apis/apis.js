import userLoader from "./user.apis";

const expressLoader = "express";

export default new Promise(async function apis(asyncExport) {
  const result = await Promise.all([import(expressLoader), userLoader]);

  const [{ default: Router }, user] = result;
  const router = Router();

  function routerFn(db, errorHandler) {
    router.use("/user", user(db, errorHandler));
    return router;
  }
  asyncExport(routerFn);
  return true;
});
