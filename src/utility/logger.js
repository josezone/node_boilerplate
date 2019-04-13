export default (value, config) => {
  if (config.LIFE_CYCLE === "dev" || "test") {
    console.log(value);
  }
  return false;
};
