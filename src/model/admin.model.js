const adminModel = Model => {
  class admin extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          adminId: {
            field: "adminId",
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
          },
          firstName: {
            field: "firstName",
            allowNull: false,
            type: DataTypes.STRING
          },
          lastName: {
            field: "lastName",
            allowNull: false,
            type: DataTypes.STRING
          },
          userImage: {
            field: "userImage",
            allowNull: true,
            type: DataTypes.STRING
          },
          status: {
            field: "status",
            allowNull: false,
            type: DataTypes.ENUM,
            values: ["Inactive", "Active", "Deleted"]
          }
        },
        {
          tableName: "admin",
          sequelize
        }
      );
    }

    static associate(models) {
      this.user_id = this.belongsTo(models.user, { onDelete: "cascade" });
    }
  }
  return admin;
};

export default adminModel;
