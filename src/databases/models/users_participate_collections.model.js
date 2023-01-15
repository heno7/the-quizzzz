"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users_Participate_Collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Participate_Collections.init(
    {
      collectionId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "collections",
          },
          key: "collectionId",
        },
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "userId",
        },
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Users_Participate_Collections",
      tableName: "users_participate_collections",
      timestamps: true,
    }
  );
  return Users_Participate_Collections;
};
