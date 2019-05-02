const credentialsModel = Model => {
  class credentials extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          credentials_id: {
            field: "credentials_id",
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          email: {
            field: "email",
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          },
          password: {
            field: "password",
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            primaryKey: false
          },
          token: {
            field: "token",
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          },
          salt: {
            field: "salt",
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          },
          status: {
            field: "status",
            type: DataTypes.ENUM,
            values: ["Active", "Inactive", "Registering", "Deleted"],
            allowNull: false,
            defaultValue: "Inactive",
            primaryKey: false
          }
        },
        {
          tableName: "credentials",
          sequelize
        }
      );
    }
  }
  return credentials;
};

export default credentialsModel;
