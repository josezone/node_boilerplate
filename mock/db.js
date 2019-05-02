const sequelizeLoader = "sequelize-mock";
const credentialModelLoader = "./model/credential.model";

class Db {
  #connectionStatus;

  #models;

  #sequelize;

  #Sequelize;

  async init() {
    let result = await Promise.all([
      import(sequelizeLoader),
      import(credentialModelLoader)
    ]);

    const [{ default: Sequelize }, { default: credentialModel }] = result;
    this.#Sequelize = Sequelize;
    this.#sequelize = new this.#Sequelize();
    result = await this.#sequelize.authenticate();

    this.#connectionStatus = true;
    this.#models = {
      credentials: credentialModel(this.#sequelize)
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
