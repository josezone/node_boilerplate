import resourceLoader from "../../utility/routeHandler";
import userControllerLoader from "../../controller/user.controller";

const rxjsLoader = "rxjs/operators";

export default new Promise(async asyncExport => {
  const [resource, userController, { take }] = await Promise.all([
    resourceLoader,
    userControllerLoader,
    import(rxjsLoader)
  ]);

  function user(db, errorHandler) {
    return resource({
      create({ email }, res, next) {
        userController
          .createUser(email, db, errorHandler)
          .pipe(take(1))
          .subscribe(
            function success({ status, body }) {
              res.status(status).json(body);
            },
            function failure(error) {
              next(error);
            }
          );
      }
    });
  }
  asyncExport(user);
  return true;
});
