import request from "supertest";

import app from "../src/app";
import cors from "../src/const/cors";
import config from "../src/config/config";
import Db from "../mock/db";

const data = [...cors()][0];

describe("Api tests", () => {
  test("api-docs success", async () => {
    const result = await Db.init();
    const db = result.connection();
    const server = await app(db);
    return request(server)
      .get(
        `/api-docs/?user=${config.SWAGGER_USER}&pass=${config.SWAGGER_PASSWORD}`
      )
      .set("Origin", data)
      .expect(200);
  });
  test("api-docs other fies", async () => {
    const result = await Db.init();
    const db = result.connection();
    const server = await app(db);
    return request(server)
      .get("/api-docs/swagger-ui-init.js")
      .set("Origin", data)
      .expect(200);
  });
  test("api-docs failure", async () => {
    const result = await Db.init();
    const db = result.connection();
    const server = await app(db);
    return request(server)
      .get(`/api-docs/`)
      .set("Origin", data)
      .expect(404);
  });
  test("It should response the POST method api", async () => {
    const result = await Db.init();
    const db = result.connection();
    const server = await app(db);
    return request(server)
      .post("/v1/api/user")
      .send({ email: "test@gmail.com" })
      .set("Origin", data)
      .set("accept", "json")
      .expect(200);
  });
  test("It should response the PATCH method apis with 404", async () => {
    const result = await Db.init();
    const db = result.connection();
    const server = await app(db);
    return request(server)
      .patch("/v1/apis/user")
      .set("Origin", data)
      .expect(401);
  });
});
