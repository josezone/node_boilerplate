const rxjsLoader = 'rxjs';
const expressLoader = 'express';
const helmetLoader = 'helmet';
const corsLoader = 'cors';
const bodyParserLoader = 'body-parser';

const whiteListLoader = './const/cors';
const configLoader = './config/config';

const originCheck = whitelist => (origin, callback) => {
	if (whitelist.indexOf(origin) !== -1) {
		callback(null, true);
	} else {
		callback(new Error('Not allowed by CORS'));
	}
};

const server = (forkJoin, from) => {
	forkJoin(
		from(import(expressLoader)),
		from(import(helmetLoader)),
		from(import(whiteListLoader)),
		from(import(corsLoader)),
		from(import(bodyParserLoader)),
		from(import(configLoader))
	).subscribe(
		([
			{ default: express },
			{ default: helmet },
			{ WHITE_LIST },
			{ default: cors },
			{ default: bodyParser },
			{ config },
		]) => {
			const app = express();
			app.use(helmet());
			app.use(cors({ origin: originCheck(WHITE_LIST) }));
			app.use(bodyParser.urlencoded({ extended: false }));
			app.use(bodyParser.json());
			app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}!`));
		},
		error => {
			console.log(error);
		}
	);
};

import(rxjsLoader)
	.then(({ forkJoin, from }) => server(forkJoin, from))
	.catch(err => console.log(err));
