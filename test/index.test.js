import request from "supertest";
import app from "../src/index";
import catchEm from "../src/utility/asyncLoader";
import errorHandler from "../src/utility/errorHandler";
import cors from "../src/const/cors";

const data = [...cors()][0];
describe("Create user", () => {
  test("It should response the GET method api", async () => {
    const server = await app(catchEm, errorHandler);
    return request(server)
      .get("/v1/api/user")
      .set("Origin", data)
      .expect(200);
  });
  test("It should response the GET method apis", async () => {
    const server = await app(catchEm, errorHandler);
    return request(server)
      .get("/v1/apis/user")
      .set("Origin", data)
      .expect(200);
  });
  test("It should response the PATCH method apis with 404", async () => {
    const server = await app(catchEm, errorHandler);
    return request(server)
      .patch("/v1/apis/user")
      .set("Origin", data)
      .expect(404);
  });
});
