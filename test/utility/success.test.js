import success from "../../src/utility/success";

const testObj = {
  status: 1,
  error: null,
  data: "data",
  message: "message"
};
test("test success", () => {
  expect(success("data", "message")).toEqual(testObj);
});
