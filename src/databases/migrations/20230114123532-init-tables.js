"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      userId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },

      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable("collections", {
      collectionId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "userId",
        },
        allowNull: false,
      },

      title: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },

      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable("questions", {
      questionId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      collectionId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "collections",
          },
          key: "collectionId",
        },
        allowNull: false,
      },

      question: {
        type: Sequelize.DataTypes.STRING(1000),
        allowNull: false,
      },

      questionType: {
        type: Sequelize.DataTypes.ENUM,
        values: ["oneChoice", "multiChoices"],
        defaultValue: "oneChoice",
        allowNull: false,
      },

      optional: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      choices: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING(1000)),
        allowNull: false,
      },

      answers: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING(1000)),
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },

      updatedAt: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable("users_participate_collections", {
      collectionId: {
        type: Sequelize.DataTypes.UUID,
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
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "userId",
        },
        allowNull: false,
        primaryKey: true,
      },

      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },

      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropAllTables();
  },
};
