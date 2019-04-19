import resourceLoader from "../../utility/routeHandler";

export default new Promise(async asyncExport => {
  const resource = await resourceLoader;

  function user(db, errorHandler) {
    return resource({
      list(req, res) {
        res.send("yoki");
        console.log(db, errorHandler, req, res);
      }
    });
  }
  asyncExport(user);
  return true;
});
