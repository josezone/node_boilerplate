import config from "./config";

const sequelizeLoader = "sequelize";
const credentialModelLoader = "../model/credential.model";
const individualRightsModelLoader = "../model/individualRights.model";
const individualRightsGroupModelLoader = "../model/individualRightsGroup.model";
const oldPasswordsModelLoader = "../model/oldPasswords.model";
const peopleModelLoader = "../model/people.model";
const peopleRightsModelLoader = "../model/peopleRights.model";
const rightsGroupModelLoader = "../model/rightsGroup.model";

class Db {
  #connectionStatus;

  #models;

  #sequelize;

  #Sequelize;

  async init() {
    let result = await Promise.all([
      import(sequelizeLoader),
      import(credentialModelLoader),
      import(individualRightsModelLoader),
      import(individualRightsGroupModelLoader),
      import(oldPasswordsModelLoader),
      import(peopleModelLoader),
      import(peopleRightsModelLoader),
      import(rightsGroupModelLoader)
    ]);

    const [
      { default: Sequelize },
      { default: credentialModel },
      { default: individualRightsModel },
      { default: individualRightsGroupModel },
      { default: oldPasswordsModel },
      { default: peopleModel },
      { default: peopleRightsModel },
      { default: rightsGroupModel }
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
    result = await this.#sequelize.authenticate();

    this.#connectionStatus = true;
    this.#models = {
      credentials: credentialModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      individualRights: individualRightsModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      individualRightsGroup: individualRightsGroupModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      oldPasswords: oldPasswordsModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      people: peopleModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      peopleRights: peopleRightsModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      ),
      rightsGroup: rightsGroupModel(this.#Sequelize.Model).init(
        this.#sequelize,
        this.#Sequelize
      )
    };

    Object.values(this.#models)
      .filter(model => typeof model.associate === "function")
      .forEach(model => model.associate(this.#models));

    result = await this.#sequelize.sync({ force: false });
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
