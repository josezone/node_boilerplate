import routerLoader from "./router/router";
import config from "./config/config";
import swaggerDoc from "./config/swaggerDoc";

const expressLoader = "express";
const helmetLoader = "helmet";
const corsLoader = "cors";
const bodyParserLoader = "body-parser";

const whiteListLoader = "./const/cors";
const onHeadersLoader = "./middlewares/timerHandler";
const loggerBuilderLoader = "./builders/logger.builder";

/**
 * @param {array} whitelist list of allowed origins
 */
function originCheck(whitelist) {
  return function originCb(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  };
}

/**
 * Controller file for node
 * @param {catchEm} catchEm method to handle async await error
 * @param {function} errorHandler custom error formatter method
 */
// eslint-disable-next-line consistent-return
async function server(db) {
  const result = await Promise.all([
    import(expressLoader),
    import(helmetLoader),
    import(corsLoader),
    import(bodyParserLoader),
    import(whiteListLoader),
    routerLoader,
    import(onHeadersLoader),
    import(loggerBuilderLoader)
  ]);
  const [
    { default: express },
    { default: helmet },
    { default: cors },
    { default: bodyParser },
    { default: WHITE_LIST },
    router,
    { default: onHeaders },
    { default: LoggerBuilder }
  ] = result;
  const app = express();
  app.use(onHeaders);
  app.use(helmet());
  // app.use(cors());
  app.use(cors({ origin: originCheck(WHITE_LIST()) }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  if (config.LIFE_CYCLE === "stage" || config.LIFE_CYCLE === "dev") {
    swaggerDoc(app);
  }
  app.use("/v1", router(db));
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, _next) => {
    new LoggerBuilder(req)
      .createExecutedAt()
      .setReqIp()
      .setMethod()
      .setOriginalUrl()
      .setUserCountry()
      .setStatusCode(err.statusCode)
      .setError(err.error)
      .setMessage(err.message)
      .execute();
    res.status(err.statusCode || 500).json(err);
  });
  return app;
}

export default server;
