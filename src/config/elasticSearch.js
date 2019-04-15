import elasticSearch from "@elastic/elasticsearch";
import config from "./config";
import logger from "../utility/logger";

class ElasticLog {
  #client

  constructor(){
    this.#client = new elasticSearch.Client({ node: config.ELASTIC_SEARCH_HOST });

    this.#client.indices.create({ index: "node_error_log" },(error)=>{
      const err = error.message.replace(/^ResponseError: /, "");
      if(err !== "resource_already_exists_exception"){
        logger(err)
      }
    });
  }

  elasticLog = body => {
    this.#client.index({
      index: "node_error_log",
      type: "posts",
      body
    });
  };
}

export default new ElasticLog();
