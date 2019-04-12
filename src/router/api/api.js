import userLoader from "./user.api";
const asyncLoader = "../../utility/asyncLoader";
const expressLoader = "express";

export default new Promise(async asyncExport => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, [{ default: Router }, user]] = await catchEm(
    Promise.all([import(expressLoader), userLoader])
  );
  const router = Router();
  const routerFn = () => {
    router.use("/user", user);
    return router;
  };
  asyncExport(routerFn);
});
