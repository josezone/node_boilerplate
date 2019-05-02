const rightsGroupModel = Model => {
  class rightsGroup extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          rights_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          group_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
          }
        },
        {
          tableName: "rights_group",
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
  return rightsGroup;
};

export default rightsGroupModel;
