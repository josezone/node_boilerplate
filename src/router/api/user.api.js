import resourceLoader from "../../utility/routeHandler";

const asyncLoader = "../../utility/asyncLoader";

export default new Promise(async (asyncExport, reject) => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, resource] = await catchEm(resourceLoader);
  if (error) {
    reject(error);
  }

  const user = (db, errorHandler) => {
    return resource({
      create(req, res) {
        console.log(db, errorHandler, req, res);
      }
    });
  };
  asyncExport(user);
});
