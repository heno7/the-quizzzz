"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Collection, { foreignKey: "collectionId" });
    }
  }
  Question.init(
    {
      questionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      collectionId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: "collections",
          },
          key: "collectionId",
        },
        allowNull: false,
      },

      question: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },

      questionType: {
        type: DataTypes.ENUM,
        values: ["oneChoice", "multiChoices"],
        defaultValue: "oneChoice",
        allowNull: false,
      },

      optional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      choices: {
        type: DataTypes.ARRAY(DataTypes.STRING(1000)),
        allowNull: false,
      },

      answers: {
        type: DataTypes.ARRAY(DataTypes.STRING(1000)),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      timestamps: true,
    }
  );
  return Question;
};
