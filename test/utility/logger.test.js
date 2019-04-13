import logger from "../../src/utility/logger"

const config = {
    LIFE_CYCLE: "dev"
}

const config2 = {
    LIFE_CYCLE: "prod"
}

test("logging in dev", () => {
    expect(logger("test",config)).toEqual(false);
  });

  test("logging in prod", () => {
    expect(logger("test",config2)).toEqual(false);
  });