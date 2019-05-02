import db from "../../src/config/db";

test("no connectin db", () => {
  expect(db.connection()).toEqual(false);
});

test("connecting db", async() => {
  expect(await db.init()).toBe(db);
});