const expressLoader = "express";
const asyncLoader = "../utility/asyncLoader";

export default new Promise(async asyncExport => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, { default: Router }] = await catchEm(import(expressLoader));
  const keyed = [
      "get",
      "read",
      "put",
      "update",
      "patch",
      "modify",
      "del",
      "delete"
    ],
    map = {
      list: "get",
      create: "post",
      update: "put",
      modify: "patch"
    };
  const routehandler = route => {
    route.mergeParams = route.mergeParams ? true : false;
    let router = Router({ mergeParams: route.mergeParams }),
      key,
      fn,
      url;

    if (route.middleware) router.use(route.middleware);

    const routeCallback = (req, res, next, id) => (err, data) => {
      if (err) return res.status(404).send(err);
      req[route.id] = data;
      next();
    };

    const routerCallback = (req, res, next, id) => {
      route.load(req, id, routeCallback(req, res, next, id));
    };

    if (route.load) {
      router.param(route.id, routerCallback);
    }

    Object.keys(route).forEach(key => {
      fn = map[key] || key;
      if (typeof router[fn] === "function") {
        url = ~keyed.indexOf(key) ? "/:" + route.id : "/";
        router[fn](url, route[key]);
      }
    });

    return router;
  };
  asyncExport(routehandler);
});
