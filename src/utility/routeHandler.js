const expressLoader = "express";
const asyncLoader = "./asyncLoader";

export default new Promise(async (asyncExport, reject) => {
  const { default: catchEm } = await import(asyncLoader);
  const [error, { default: Router }] = await catchEm(import(expressLoader));
  if (error) {
    reject(error);
    return false;
  }

  const keyed = [
    "get",
    "read",
    "put",
    "update",
    "patch",
    "modify",
    "del",
    "delete"
  ];
  const map = {
    list: "get",
    create: "post",
    update: "put",
    modify: "patch"
  };
  const routehandler = route => {
    // eslint-disable-next-line no-param-reassign
    route.mergeParams = !!route.mergeParams;
    const router = Router({ mergeParams: route.mergeParams });
    
    Object.keys(route).forEach(key => {
      const fn = map[key] || key;
      if (typeof router[fn] === "function") {
        // eslint-disable-next-line no-bitwise
        const url = ~keyed.indexOf(key) ? `/:${route.id}` : "/";
        router[fn](url, route[key]);
      }
    });

    return router;
  };
  asyncExport(routehandler);
  return true;
});
