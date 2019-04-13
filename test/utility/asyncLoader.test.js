import asyncLoader from "../../src/utility/asyncLoader";

const dataSet1 = new Promise((resolve, reject) => {
  resolve("done");
});

const dataSet2 = new Promise((resolve, reject) => {
  reject("fail");
});

test("test asynchronous loading resolve expect done", () => {
  return expect(asyncLoader(dataSet1)).resolves.toEqual([null,"done"]);
});

test("test asynchronous loading reject expect fail", () => {
  return expect(asyncLoader(dataSet2)).resolves.toEqual(["fail"]);
});
