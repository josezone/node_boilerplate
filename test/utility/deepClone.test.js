import deepClone from "../../src/utility/deepClone";

const testObj = {
  result: "done"
};

test("deep clones the object", () => {
  expect(deepClone(testObj)).toEqual(testObj);
});
