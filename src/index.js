import memwatch from "node-memwatch";
import heapdump from "heapdump";
import logger from "./utility/logger";

import server from "./app";
import config from "./config/config";
import Db from "./config/db";

async function initProcess() {
  const result = await Db.init();
  const db = result.connection();
  const app = await server(db);
  app.listen(config.PORT, () =>
    logger(`Listening on port ${config.PORT}!`, config)
  );
}

initProcess();

memwatch.on("leak", () => {
  heapdump.writeSnapshot();
});
