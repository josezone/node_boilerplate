import resourceLoader from "../../utility/routeHandler";
import userControllerLoader from "../../controller/user.controller";

const rxjsLoader = "rxjs/operators";

export default new Promise(async asyncExport => {
  const [resource, userController, { take }] = await Promise.all([
    resourceLoader,
    userControllerLoader,
    import(rxjsLoader)
  ]);

  function user(db) {
    return resource({
      create(
        {
          body: { email }
        },
        res,
        next
      ) {
        userController
          .createUser(email, db)
          .pipe(take(1))
          .subscribe(
            function success(value) {
              res.status(value.statusCode).json(value);
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
