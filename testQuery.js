require("dotenv").config();

const { User, Collection, Question } = require("./src/databases/models");

(async () => {
  // test 1
  const user = await User.findOne({
    raw: true,
    where: {
      username: "testuser1",
    },
  });
  console.log(user);
  // const collections = await user.getCollections();
  // console.log(collections);
  // test 2
  // const collection = await Collection.findOne({
  //   where: { title: "Collection 1" },
  // });
  // const questions = await collection.getQuestions();
  // console.log(questions);
  // const author = await collection.getAuthor();
  // console.log(author);
  // const collections = await Collection.findAll();
  // console.log(collections);
  // const collection = await Collection.findOne({
  //   where: { title: "Collection 1" },
  // });
  // const participants = await collection.getParticipants();
  // console.log(participants);
  //   const user = await User.findOne({
  //     where: {
  //       username: "testuser1",
  //     },
  //   });
  //   const participateCollections = await user.getParticipateCollections();
  //   console.log(participateCollections);
})();
