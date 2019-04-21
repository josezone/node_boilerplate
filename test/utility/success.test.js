import success from "../../src/utility/success";

const testObj = {
  status: 1,
  error: null,
  data: "data",
  message: "message",
  statusCode: 200
};
test("test success", () => {
  expect(success("data", 200, "message")).toEqual(testObj);
});