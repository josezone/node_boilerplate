const userModel = Model => {
  class user extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          userId: {
            field: "userId",
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
          },
          email: {
            field: "email",
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
          },
          password: {
            field: "password",
            allowNull: false,
            type: DataTypes.STRING
          }
        },
        {
          tableName: "user",
          sequelize
        }
      );
    }
  }
  return user;
};

export default userModel