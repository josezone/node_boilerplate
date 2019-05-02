const oldPasswordsModel = Model => {
  class oldPasswords extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          old_password_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          },
          salt: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          }
        },
        {
          tableName: "old_passwords",
          sequelize
        }
      );
    }

    static associate(models) {
      this.credentials_id = this.belongsTo(models.credentials, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  return oldPasswords;
};

export default oldPasswordsModel;
