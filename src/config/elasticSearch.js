const elasticSearchLoader = "@elastic/elasticsearch";
const configLoader = "./config";

class ElasticLog {
  #client;

  #init = async () => {
    const [{ default: elasticSearch }, { default: config }] = await Promise.all(
      [import(elasticSearchLoader), import(configLoader)]
    );

    this.#client = new elasticSearch.Client({
      node: config.ELASTIC_SEARCH_HOST
    });

    this.#client.indices.create({ index: "node_error_log" }, error => {
      error.message.replace(/^ResponseError: /, "");
    });
  };

  constructor() {
    this.#init();
  }

  elasticLog(body) {
    this.#client.index({
      index: "node_error_log",
      type: "posts",
      body
    });
  }
}

export default new ElasticLog();
