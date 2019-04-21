import userLoader from "./user.api";

const expressLoader = "express";
const userApiValidatorLoader = "../../validator/user.api.validator";

export default new Promise(async function api(asyncExport) {
  const result = await Promise.all([
    import(expressLoader),
    userLoader,
    import(userApiValidatorLoader)
  ]);

  const [{ default: Router }, user, { default: userApiValidator }] = result;
  const router = Router();

  function routerFn(db) {
    router.use("/user", userApiValidator, user(db));
    return router;
  }
  asyncExport(routerFn);
  return true;
});
