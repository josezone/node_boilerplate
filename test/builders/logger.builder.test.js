import LoggerBuilder from "../../src/builders/logger.builder";

const req = {
  startAt: Date.now(),
  ip: "127.0.0.1",
  method: "test",
  originalUrl: "http://localhost"
};

test("logger elastic test", () => {
  expect(
    new LoggerBuilder(req)
      .createExecutedAt()
      .setReqIp()
      .setMethod()
      .setOriginalUrl()
      .setUserCountry()
      .setStatusCode(1000)
      .setError("err")
      .setMessage("message")
      .execute()
  ).toEqual(false);
});

test("logger elastic test without code", () => {
  expect(
    new LoggerBuilder(req)
      .createExecutedAt()
      .setReqIp()
      .setMethod()
      .setOriginalUrl()
      .setUserCountry()
      .setStatusCode()
      .setError("err")
      .setMessage("message")
      .execute()
  ).toEqual(false);
});
