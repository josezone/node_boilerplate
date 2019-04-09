const expressLoader = "express";
const helmetLoader = "helmet";
const corsLoader = "cors";
const bodyParserLoader = "body-parser";

const asyncLoader = "./utility/asyncLoader";
const errorHandler = "./utility/errorHandler";
const whiteListLoader = "./const/cors";
const configLoader = "./config/config";
const routerLoader = "./router/router";

const originCheck = whitelist => (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

const server = async (catchEm, errorHandler) => {
  const [error,[
    {default: express},
    {default: helmet},
    {default: cors},
    {default: bodyParser}, 
    {WHITE_LIST}, 
    {config},
    {default: asyncRouter}
  ]] = 
  await catchEm(Promise.all([
    import(expressLoader), 
    import(helmetLoader),
    import(corsLoader),
    import(bodyParserLoader),
    import(whiteListLoader),
    import(configLoader),
    import(routerLoader)
    ]));
  console.log(await catchEm(asyncRouter))
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: originCheck(WHITE_LIST) }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.listen(config.PORT, () =>
      console.log(`Listening on port ${config.PORT}!`)
    );
};

Promise.all([import(asyncLoader), import(errorHandler)])
  .then(([catchEm, { errorHandler }]) => server(catchEm.default, errorHandler))
  .catch(err => console.log(err));
