import uuidv4 from "uuid/v4";
import userQueries from "../queries/user.queries";
import catchEm from "../utility/asyncLoader";
import successBuilderLoader from "../builders/success.builder";
import failureBuilderLoader from "../builders/failure.builder";

const rxjsLoader = "rxjs";

export default new Promise(async function users(asyncExport) {
  const [{ Observable }, successBuilder, failureBuilder] = await Promise.all([
    import(rxjsLoader),
    successBuilderLoader,
    failureBuilderLoader
  ]);
  class UserController {
    static createUserCb(email, db) {
      return async function observerCb(observer) {
        const [err, result] = await catchEm(
          userQueries.init(db).createRegistration(email, uuidv4(), "Register")
        );
        if (err) {
          failureBuilder
            .setObserver(observer)
            .setError(err)
            .setMessage("query error")
            .setStatusCode(500)
            .done();
          return false;
        }
        successBuilder
          .setObserver(observer)
          .setData({ email })
          .setMessage("Please check your email to complete the registration")
          .setStatusCode(200)
          .done();
        const [, isNewRecord] = result;
        if (isNewRecord) {
          // send email
        }
        return true;
      };
    }

    createUser(email, db) {
      return Observable.create(this.constructor.createUserCb(email, db));
    }

    completeRegistration = () => {};

    forgotPassword = () => {};

    restPassword = () => {};

    changePassword = () => {};
  }

  asyncExport(new UserController());
  return true;
});
