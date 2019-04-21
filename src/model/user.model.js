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
            allowNull: true,
            type: DataTypes.STRING
          },
          registrationToken: {
            field: "registrationToken",
            allowNull: true,
            type: DataTypes.STRING
          },
          status: {
            field: "status",
            allowNull: false,
            type: DataTypes.ENUM,
            values: ["Inactive", "Active", "Deleted", "Register"]
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

export default userModel;
