import resourceLoader from "../../utility/routeHandler";

const asyncLoader = "../../utility/asyncLoader";

export default new Promise(async (asyncExport, reject) => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, resource] = await catchEm(resourceLoader);
  if (error) {
    reject(error);
    return false;
  }

  const user = (db, errorHandler) => {
    return resource({
      list(req, res) {
        // next({error: "data"})
        res.send("yoki");
        console.log(db, errorHandler, req, res);
      }
    });
  };
  asyncExport(user);
  return true;
});
