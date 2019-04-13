module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb-base", "plugin:jest/recommended", "prettier"],
  plugins: ["import", "jest", "prettier", "babel"],
  env: {
    node: true,
    "jest/globals": true
  },
  rules: {
    "no-unused-expressions": 0,
    "babel/no-unused-expressions": 2
  }
};
