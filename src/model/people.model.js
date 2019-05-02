const peopleModel = Model => {
  class people extends Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          people_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          first_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            primaryKey: false
          },
          last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            primaryKey: false
          },
          profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            primaryKey: false
          },
          status: {
            type: DataTypes.ENUM,
            values: ["Active", "Inactive"],
            allowNull: false,
            defaultValue: "Inactive",
            primaryKey: false
          }
        },
        {
          tableName: "people",
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
  return people;
};

export default peopleModel;
