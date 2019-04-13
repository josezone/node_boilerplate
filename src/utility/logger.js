export default (value, config) => {
  if (config.LIFE_CYCLE === "dev") {
    console.log(value);
  }
  return false;
};
