class Logger {
  createExecutedAt(time) {
    this.executedAt = time;
    this.executionTime = Date.now() - time;
    return this;
  }

  setReqIp(ip) {
    this.reqIp = ip;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setOriginalUrl(originalUrl) {
    this.originalUrl = originalUrl;
    return this;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode || 500;
    return this;
  }

  setError(error) {
    this.error = error;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  execute() {
    return {
      executedAt: this.executedAt,
      executionTime: this.executionTime,
      reqIp: this.reqIp,
      method: this.method,
      originalUrl: this.originalUrl,
      statusCode: this.statusCode,
      error: this.error,
      message: this.message
    };
  }
}
export default Logger;
