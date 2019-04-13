export const clientModel = Model => {
    class client extends Model {
      static init(sequelize, DataTypes) {
        return super.init(
          {
            clientId: {
              field: "clientId",
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
            }
          },
          {
            tableName: "client",
            sequelize
          }
        );
      }
  
      static associate(models) {
        this.user_id = this.belongsTo(models.user, { onDelete: "cascade" });
      }
    }
    return client;
  };
  