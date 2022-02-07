const { Op } = require("sequelize");
const sequelize = require("../config/database");
const setAssociations = require("../config/modelAssociations");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");
const Like = require("../models/Like");

const run = async () => {
  await sequelize.authenticate();
  setAssociations();

  await User.destroy({
    where: {
      email: {
        [Op.not]: null,
      },
    },
  });

  const [user1, user2] = await User.bulkCreate([
    {
      username: "foo",
      email: "foo@test.com",
      password: "123456",
      avatar: "",
    },
    {
      username: "bar",
      email: "bar@test.com",
      password: "123456",
      avatar: "",
    },
  ]);

  const [post1, post2] = await Post.bulkCreate([
    {
      user_id: user1.user_id,
      title: "Amazing BNE",
      destination: "Brisbane",
      description: "Brisbane is a wonderful place",
      image_url: "",
    },
    {
      user_id: user2.user_id,
      title: "Why I love Sydney",
      destination: "Sydney",
      description: "Sydney is a wonderful place",
      image_url: "",
    },
  ]);

  await Comment.bulkCreate([
    {
      user_id: user1.user_id,
      post_id: post1.post_id,
      comment: "I wrote this!",
    },
    {
      user_id: user1.user_id,
      post_id: post1.post_id,
      comment: "This is great!",
    },
    {
      user_id: user1.user_id,
      post_id: post2.post_id,
      comment: "I hate Sydney",
    },
  ]);

  const [tag1, tag2, tag3] = await Tag.bulkCreate([
    {
      name: "Brisbane",
    },
    {
      name: "travel",
    },
    {
      name: "abc",
    },
  ]);

  await Like.bulkCreate([
    {
      post_id: post1.post_id,
      giver_id: user1.user_id,
    },
    {
      post_id: post2.post_id,
      giver_id: user1.user_id,
    },
    {
      post_id: post2.post_id,
      giver_id: user2.user_id,
    },
  ]);

  await post1.addTags([tag1, tag2, tag3]);
  await post2.addTags([tag3]);

  process.exit();
};

run();
