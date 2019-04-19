function deepClone(cloneObject) {
  return JSON.parse(JSON.stringify(cloneObject));
}
export default deepClone;
