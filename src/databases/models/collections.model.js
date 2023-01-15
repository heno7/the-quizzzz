"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.User, {
        as: "author",
        foreignKey: "createdBy",
      });
      Collection.hasMany(models.Question, {
        foreignKey: "collectionId",
      });
      Collection.belongsToMany(models.User, {
        as: "participants",
        foreignKey: "collectionId",
        through: models.Users_Participate_Collections,
      });
    }
  }
  Collection.init(
    {
      collectionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },

      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "userId",
        },
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Collection",
      tableName: "collections",
      timestamps: true,
    }
  );
  return Collection;
};
