import elasticSearch from "@elastic/elasticsearch";
import config from "./config";

const client = new elasticSearch.Client({ node: config.ELASTIC_SEARCH_HOST });

client.indices.create({ index: "nodeLog" });

const elasticLog = (err, req) => {
  client.index(
    {
      index: "nodeLog",
      id: "1",
      type: "posts",
      body: {
        PostName: "Integrating Elasticsearch Into Your Node.js Application",
        PostType: "Tutorial",
        PostBody:
          "This is the text of our tutorial about using Elasticsearch in your Node.js application."
      }
    },
    function(err, resp, status) {
      console.log(resp);
    }
  );
};
// import winston from "winston";
// import Elasticsearch from "winston-elasticsearch";

// const esTransportOpts = {
//   level: "error"
// };

// const logger = winston.createLogger({
//   transports: [new Elasticsearch(esTransportOpts)],
//   exitOnError: false
// });

// export default logger;
