import userLoader from "./user.apis";

const expressLoader = "express";
const asyncLoader = "../../utility/asyncLoader";

export default new Promise(async (asyncExport, reject) => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, result] = await catchEm(
    Promise.all([import(expressLoader), userLoader])
  );
  if (error) {
    reject(error);
  }

  const [{ default: Router }, user] = result;
  const router = Router();

  const routerFn = (db, errorHandler) => {
    router.use("/user", user(db, errorHandler));
    return router;
  };
  asyncExport(routerFn);
});
