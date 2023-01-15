"use strict";

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const users = [
      {
        userId: uuidv4(),
        username: "testuser1",
        email: "testuser1@gmail.com",
        password: "1234",
      },
      {
        userId: uuidv4(),
        username: "testuser2",
        email: "testuser2@gmail.com",
        password: "12345",
      },
      {
        userId: uuidv4(),
        username: "testuser3",
        email: "testuser3@gmail.com",
        password: "123456",
      },
    ];

    const collections = [
      {
        collectionId: uuidv4(),
        createdBy: users[0].userId,
        title: "Collection 1",
      },
      {
        collectionId: uuidv4(),
        createdBy: users[0].userId,
        title: "Collection 2",
      },
      {
        collectionId: uuidv4(),
        createdBy: users[1].userId,
        title: "Collection 3",
      },
    ];

    const questions = [
      {
        questionId: uuidv4(),
        collectionId: collections[0].collectionId,
        question: "Question 1-0",
        questionType: "oneChoice",
        optional: false,
        choices: ["A", "B", "C", "D"],
        answers: ["B"],
      },
      {
        questionId: uuidv4(),
        collectionId: collections[0].collectionId,
        question: "Question 2-0",
        questionType: "oneChoice",
        choices: ["A", "B", "C", "D"],
        optional: true,
        answers: ["A"],
      },
      {
        questionId: uuidv4(),
        collectionId: collections[0].collectionId,
        question: "Question 3-0",
        questionType: "multiChoices",
        optional: false,
        choices: ["A", "B", "C", "D"],
        answers: ["C", "D"],
      },
      {
        questionId: uuidv4(),
        collectionId: collections[1].collectionId,
        question: "Question 1-1",
        questionType: "oneChoice",
        optional: true,
        choices: ["A", "B", "C", "D"],
        answers: ["B"],
      },
      {
        questionId: uuidv4(),
        collectionId: collections[1].collectionId,
        question: "Question 2-1",
        questionType: "oneChoice",
        optional: false,
        choices: ["A", "B", "C", "D"],
        answers: ["B"],
      },
      {
        questionId: uuidv4(),
        collectionId: collections[2].collectionId,
        question: "Question 3-1",
        questionType: "oneChoice",
        optional: false,
        choices: ["A", "B", "C", "D"],
        answers: ["A"],
      },
    ];

    const participants = [
      {
        userId: users[1].userId,
        collectionId: collections[0].collectionId,
      },
      {
        userId: users[1].userId,
        collectionId: collections[1].collectionId,
      },
      {
        userId: users[2].userId,
        collectionId: collections[0].collectionId,
      },
      {
        userId: users[2].userId,
        collectionId: collections[1].collectionId,
      },
      {
        userId: users[2].userId,
        collectionId: collections[2].collectionId,
      },
      {
        userId: users[0].userId,
        collectionId: collections[2].collectionId,
      },
    ];
    await queryInterface.bulkInsert("users", users, {});

    await queryInterface.bulkInsert("collections", collections, {});

    await queryInterface.bulkInsert("questions", questions, {});

    await queryInterface.bulkInsert(
      "users_participate_collections",
      participants,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("collections", null, {});
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("users_participate_collections", null, {});
  },
};
