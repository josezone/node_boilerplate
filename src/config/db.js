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
      throw errorHandler(err);
    }
    const [
      { default: Sequelize },
      { default: userModel },
      { default: adminModel },
      { default: clientModel }
    ] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new this.#Sequelize(
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
      throw errorHandler(err);
    }
    this.#connectionStatus = true;
    this.#models = {
      user: userModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      admin: adminModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      client: clientModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      )
    };

    Object.values(this.#models)
      .filter(model => typeof model.associate === "function")
      .forEach(model => model.associate(this.#models));

    [err, result] = await catchEm(this.#sequelize.sync({ force: false }));
    if (err) {
      throw errorHandler(err);
    }
    return this;
  };

  connection = () => {
    if (this.#connectionStatus) {
      return {
        ...this.#models
      };
    }
    return false;
  };
}

export default new Db();
