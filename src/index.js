import memwatch from "node-memwatch";
import routerLoader from "./router/router";
import heapdump from "heapdump";

const expressLoader = "express";
const helmetLoader = "helmet";
const corsLoader = "cors";
const bodyParserLoader = "body-parser";

const asyncLoader = "./utility/asyncLoader";
const errorHandler = "./utility/errorHandler";
const whiteListLoader = "./const/cors";
const configLoader = "./config/config";
const dbLoader = "./config/db";

const originCheck = whitelist => (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

const server = async (catchEm, errorHandler) => {
  const [error, result] = await catchEm(
    Promise.all([
      import(expressLoader),
      import(helmetLoader),
      import(corsLoader),
      import(bodyParserLoader),
      import(whiteListLoader),
      import(configLoader),
      routerLoader,
      import(dbLoader)
    ])
  );
  if (error) throw errorHandler(error);
  const [
    { default: express },
    { default: helmet },
    { default: cors },
    { default: bodyParser },
    { WHITE_LIST },
    { config },
    router,
    { default: Db }
  ] = result;
  const db = (await Db.init(catchEm, errorHandler, config)).connection();
  if (db) {
    const app = express();
    app.use(helmet());
    // app.use(cors());
    app.use(cors({ origin: originCheck(WHITE_LIST) }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/v1", await router(db, catchEm, errorHandler));
    app.listen(config.PORT, () =>
      console.log(`Listening on port ${config.PORT}!`)
    );
  }
};

Promise.all([import(asyncLoader), import(errorHandler)])
  .then(([catchEm, { errorHandler }]) => server(catchEm.default, errorHandler))
  .catch(err => console.log(err));

memwatch.on("leak", info => {
  heapdump.writeSnapshot((err, filename) => {
    console.log("dump written to", filename);
  });
});
