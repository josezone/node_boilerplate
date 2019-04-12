const sequelizeLoader = "sequelize";
const userModelLoader = "../model/user.model";

class Db {
  #connectionStatus;
  #models;
  #sequelize;
  #Sequelize;

  init = async (catchEm, errorHandler, config) => {
    const [error, result] = await catchEm(
      Promise.all([import(sequelizeLoader), import(userModelLoader)])
    );
    const [{ default: Sequelize }, { userModel }] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new Sequelize(
      config.DATABASE_NAME,
      config.DATABASE_USER,
      config.DATABASE_PASSWORD,
      {
        host: config.DATABASE_HOST,
        logging: false,
        dialect: config.DATABASE_DIALECT,
        pool: {
          max: 5,
          acquire: 30000,
          idle: 10000
        }
      }
    );
    const [err, status] = await catchEm(this.#sequelize.authenticate());
    if (!err) this.#connectionStatus = true;

    this.#models = {
      userModel: {
        model: userModel(Sequelize.Model).init(this.#sequelize, Sequelize),
        method: userModel(Sequelize.Model)
      }
    };
    return this;
  };

  connection = () => do {
    if (this.#connectionStatus)
      ({
        ...this.#models,
        sequelize: this.#sequelize,
        Sequelize: this.#Sequelize
      });
    else undefined;
  };
}

export default new Db();
