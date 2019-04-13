const sequelizeLoader = "sequelize";
const userModelLoader = "../model/user.model";
const adminModelLoader = "../model/admin.model";
const clientModelLoader = "../model/client.model";

class Db {
  #connectionStatus;
  #models;
  #sequelize;
  #Sequelize;

  init = async (catchEm, errorHandler, config) => {
    let [err, result] = await catchEm(
      Promise.all([
        import(sequelizeLoader),
        import(userModelLoader),
        import(adminModelLoader),
        import(clientModelLoader)
      ])
    );
    if (err) {
      console.log(errorHandler(err));
      return this;
    }
    const [
      { default: Sequelize },
      { userModel },
      { adminModel },
      { clientModel }
    ] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new Sequelize(
      config.DATABASE_NAME,
      config.DATABASE_USER,
      config.DATABASE_PASSWORD,
      {
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        logging: false,
        dialect: config.DATABASE_DIALECT,
        pool: {
          max: 5,
          acquire: 30000,
          idle: 10000
        }
      }
    );
    [err, result] = await catchEm(this.#sequelize.authenticate());
    if (err) {
      console.log(errorHandler(err));
      return this;;
    }
    this.#connectionStatus = true;
    this.#models = {
      user: userModel(Sequelize.Model).init(this.#sequelize, Sequelize),
      admin: adminModel(Sequelize.Model).init(this.#sequelize, Sequelize),
      client: clientModel(Sequelize.Model).init(this.#sequelize, Sequelize)
    };

    Object.values(this.#models)
      .filter(model => typeof model.associate === "function")
      .forEach(model => model.associate(this.#models));

    [err, result] = await catchEm(this.#sequelize.sync({ force: false }));
    if (err) {
      console.log(errorHandler(err));
      return this;;
    }
    return this;
  };

  connection = () => do {
    if (this.#connectionStatus)
      ({
        ...this.#models
      });
    else undefined;
  };
}

export default new Db();
