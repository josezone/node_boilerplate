import requestCountry from "request-country";

import elasticsearch from "../config/elasticSearch";

class Logger {
  #req;

  #res;

  constructor(req){
    this.#req = req;
    this.#res = {};
  }

  createExecutedAt() {
    this.#res.executed_at = this.#req.startAt;
    this.#res.execution_time = Date.now() - this.#req.startAt;
    return this;
  }

  setReqIp() {
    this.#res.req_ip = this.#req.ip;
    return this;
  }

  setMethod() {
    this.#res.method = this.#req.method;
    return this;
  }

  setOriginalUrl() {
    this.#res.original_url = this.#req.originalUrl;
    return this;
  }

  setUserCountry() {
    this.#res.country = requestCountry(this.#req);
    return this;
  }

  setStatusCode(statusCode) {
    this.#res.status_code = statusCode || 500;
    return this;
  }

  setError(error) {
    this.#res.error = error;
    return this;
  }

  setMessage(message) {
    this.#res.message = message;
    return this;
  }

  execute() {
    elasticsearch.elasticLog(this.#res);
  }
}
export default Logger;
