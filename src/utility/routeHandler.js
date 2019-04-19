const expressLoader = "express";

export default new Promise(async function asyncLoader(asyncExport) {
  const { default: Router } = await import(expressLoader);

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

  function routehandler(route) {
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
  }
  
  asyncExport(routehandler);
  return true;
});
