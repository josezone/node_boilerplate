import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  LIFE_CYCLE: process.env.LIFE_CYCLE,
  DATABASE_DIALECT: "mysql"
};