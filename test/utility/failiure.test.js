import failiure from "../../src/utility/failiure";

const testObj = {
  status: 0,
  error: "error",
  data: null,
  message: "message",
  statusCode: "statusCode"
};
test("test failiure", () => {
  expect(failiure("error", "statusCode", "message")).toEqual(testObj);
});
