import memwatch from "node-memwatch";
import heapdump from "heapdump";
import routerLoader from "./router/router";
import logger from "./utility/logger";
import config from "./config/config";

const expressLoader = "express";
const helmetLoader = "helmet";
const corsLoader = "cors";
const bodyParserLoader = "body-parser";

const asyncLoader = "./utility/asyncLoader";
const errorLoader = "./utility/errorHandler";
const whiteListLoader = "./const/cors";
const dbLoader = "./config/db";
const onHeadersLoader = "./middlewares/timerHandler";
const loggerBuilderLoader = "./builders/logger.builder";

const originCheck = whitelist => (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

// eslint-disable-next-line consistent-return
const server = async (catchEm, errorHandler) => {
  let [error, result] = await catchEm(
    Promise.all([
      import(expressLoader),
      import(helmetLoader),
      import(corsLoader),
      import(bodyParserLoader),
      import(whiteListLoader),
      routerLoader,
      import(dbLoader),
      import(onHeadersLoader),
      import(loggerBuilderLoader)
    ])
  );
  if (error) throw errorHandler(error);
  const [
    { default: express },
    { default: helmet },
    { default: cors },
    { default: bodyParser },
    { default: WHITE_LIST },
    router,
    { default: Db },
    { default: onHeaders },
    { default: LoggerBuilder }
  ] = result;
  [error, result] = await catchEm(Db.init(catchEm, errorHandler, config));
  if (error) throw errorHandler(error);
  const db = result.connection();
  if (db) {
    const app = express();
    app.use(onHeaders);
    app.use(helmet());
    // app.use(cors());
    app.use(cors({ origin: originCheck(WHITE_LIST()) }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/v1", router(db, errorHandler));
    app.use((err, req, res, next) => {
      const loggerData = new LoggerBuilder()
        .createExecutedAt(req.startAt)
        .setReqIp(req.ip)
        .setMethod(req.method)
        .setOriginalUrl(req.originalUrl)
        .setStatusCode(err.statusCode)
        .setError(err.error)
        .setMessage(err.message)
        .execute();
      console.log(res, next, loggerData);
    });
    return app;
  }
};

Promise.all([import(asyncLoader), import(errorLoader)])
  .then(async ([catchEm, { default: errorHandler }]) => {
    const app = await server(catchEm.default, errorHandler);
    app.listen(config.PORT, () =>
      logger(`Listening on port ${config.PORT}!`, config)
    );
  })
  .catch(err => logger(err, config));

memwatch.on("leak", () => {
  heapdump.writeSnapshot();
});

export default server;
