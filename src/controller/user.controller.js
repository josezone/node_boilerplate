const rxjsLoader = "rxjs";

export default new Promise(async function users(asyncExport) {
  const { Observable } = await import(rxjsLoader);
  class UserController {
    static createUserCb(email, db, errorHandler) {
      return function observerCb(observer) {
        console.log(email, db, errorHandler);
        observer.next({ status: 200, body: { data: "ok" } });
      };
    }

    createUser(email, db, errorHandler) {
      return Observable.create(
        this.constructor.createUserCb(email, db, errorHandler)
      );
    }

    completeRegisteration = () => {};

    forgotPassword = () => {};

    restPassword = () => {};

    changePassword = () => {};
  }

  asyncExport(new UserController());
  return true;
});
