import userLoader from "./user.apis";
const expressLoader = "express";

export default new Promise(async asyncExport => {
  const routerFn = async (db, catchEm, errorHandler) => {
    const [error, result] = await catchEm(
      Promise.all([import(expressLoader), userLoader])
    );

    if (error) {
      console.log(errorHandler(error));
      return;
    }

    const [{ default: Router }, user] = result;
    const router = Router();

    router.use("/user", user);
    return router;
  };
  asyncExport(routerFn);
});
