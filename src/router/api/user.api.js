import resourceLoader from "../../utility/routeHandler";

export default new Promise(async asyncExport => {
  const resource = await resourceLoader;

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
