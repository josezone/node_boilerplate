import elasticSearch from "@elastic/elasticsearch";
import config from "./config";

const client = new elasticSearch.Client({ node: config.ELASTIC_SEARCH_HOST });

client.indices.create({ index: "nodeErrorLog" });

const elasticLog = body => {
  client.index({
    index: "nodeErrorLog",
    type: "posts",
    body
  });
};

export default elasticLog;
