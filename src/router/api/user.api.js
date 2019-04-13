import resourceLoader from "../../utility/routeHandler";
const asyncLoader = "../../utility/asyncLoader";

export default new Promise(async asyncExport => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, resource] = await catchEm(resourceLoader);
  const user = (db, catchEm, errorHandler) => resource({
    list(req, res) {},
    create(req, res) {}
  });
  asyncExport(user);
});
