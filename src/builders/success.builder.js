const successGeneratorLoader = "../utility/success";

export default new Promise(async function successLoader(asyncExport) {
  const { default: successGenerator } = await import(successGeneratorLoader);
  class Success {
    #observer;

    #data;

    #message;

    #statusCode;

    setObserver(observer) {
      this.#observer = observer;
      return this;
    }

    setData(data) {
      this.#data = data;
      return this;
    }

    setMessage(message) {
      this.#message = message;
      return this;
    }

    setStatusCode(statusCode) {
      this.#statusCode = statusCode;
      return this;
    }

    done() {
      const resp = successGenerator(
        this.#data,
        this.#statusCode,
        this.#message
      );
      this.#observer.next(resp);
    }
  }
  asyncExport(new Success());
});
