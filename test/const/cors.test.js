import cors from "../../src/const/cors";

const data = [...cors()];
test("whitelist", () => {
  expect(cors()).toEqual(data);
});
