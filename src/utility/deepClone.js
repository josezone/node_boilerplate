const deepClone = cloneObject => JSON.parse(JSON.stringify(cloneObject));
export default deepClone;