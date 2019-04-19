import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_DIALECT: "mysql",
  LIFE_CYCLE: process.env.LIFE_CYCLE,
  ELASTIC_SEARCH_HOST: process.env.ELASTIC_SEARCH_HOST,
  SWAGGER_USER: process.env.SWAGGER_USER,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD
};
