import userLoader from "./user.api";

const expressLoader = "express";

export default new Promise(async asyncExport => {
  const result = await Promise.all([import(expressLoader), userLoader]);

  const [{ default: Router }, user] = result;
  const router = Router();

  const routerFn = (db, errorHandler) => {
    /**
     * @swagger
     * /v1/api/users:
     *    get:
     *      description: This should return all users
     */
    router.use("/user", user(db, errorHandler));
    return router;
  };
  asyncExport(routerFn);
  return true;
});
