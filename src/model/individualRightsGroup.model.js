const individualRightsGroupModel = Model => {
  class individualRightsGroup extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          individual_rights_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          status: {
            type: DataTypes.ENUM,
            values: ["Grand", "Revoke"],
            allowNull: false,
            defaultValue: "Revoke",
            primaryKey: false
          }
        },
        {
          tableName: "individual_rights_group",
          sequelize
        }
      );
    }

    static associate(models) {
      this.revoked_by = this.belongsTo(models.people, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });

      this.assigned_by = this.belongsTo(models.people, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
      });

      this.individual_rights_id = this.belongsTo(models.individualRights, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      this.rights_group_id = this.belongsTo(models.rightsGroup, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
    }
  }
  return individualRightsGroup;
};

export default individualRightsGroupModel;
