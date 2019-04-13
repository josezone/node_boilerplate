import errorHandler from "../../src/utility/errorHandler";

const testObj = "string test";
const testObj2 = new Error("error test");

const result = (
  "error test\n" +
  testObj2.stack
    .replace(/^Error: error test\n/, "")
    .replace(/^ +/gm, "")
    .replace(/^at /gm, "")
    .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, "@$1\n")
    .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, "@???$1\n")
).substr(0, 150);

test("error handling from string object", () => {
  expect(errorHandler(testObj)).toBe("string test\nundefined:?:?");
});

test("error handling from error object", () => {
  expect(errorHandler(testObj2)).toBe(result);
});
