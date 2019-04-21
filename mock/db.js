const sequelizeLoader = "sequelize-mock";
const userModelLoader = "./model/user.model";
const adminModelLoader = "./model/admin.model";
const clientModelLoader = "./model/client.model";

class Db {
  #connectionStatus;

  #models;

  #sequelize;

  #Sequelize;

  async init() {
    let result = await Promise.all([
      import(sequelizeLoader),
      import(userModelLoader),
      import(adminModelLoader),
      import(clientModelLoader)
    ]);

    const [
      { default: Sequelize },
      { default: userModel },
      { default: adminModel },
      { default: clientModel }
    ] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new this.#Sequelize();
    result = await this.#sequelize.authenticate();

    this.#connectionStatus = true;
    this.#models = {
      user: userModel(this.#sequelize),
      admin: adminModel(this.#sequelize),
      client: clientModel(this.#sequelize)
    };
    return this;
  }

  connection() {
    if (this.#connectionStatus) {
      return {
        ...this.#models
      };
    }
    return false;
  }
}

export default new Db();
