const peopleRightsModel = Model => {
  class peopleRights extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          people_rights_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          status: {
            type: DataTypes.ENUM,
            values: ["Grant", "Revoke"],
            allowNull: false,
            defaultValue: "Revoke",
            primaryKey: false
          }
        },
        {
          tableName: "people_rights",
          sequelize
        }
      );
    }

    static associate(models) {
      this.rights_group_id = this.belongsTo(models.rightsGroup, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.people_id = this.belongsTo(models.people, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.assigned_by = this.belongsTo(models.people, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });

      this.revoked_by = this.belongsTo(models.people, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });
    }
  }
  return peopleRights;
};

export default peopleRightsModel;
