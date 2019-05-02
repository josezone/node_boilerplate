const individualRightsModel = Model => {
  class individualRights extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          individual_rights_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          individual_right: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          }
        },
        {
          tableName: "individual_rights",
          sequelize
        }
      );
    }

    static associate(models) {
      this.created_by = this.belongsTo(models.people, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });
    }
  }
  return individualRights;
};

export default individualRightsModel;
