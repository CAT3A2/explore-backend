const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Comment = require("../models/Comment");
const Tag = require("../models/Tag");

const setAssociations = () => {
  // one user as followee can has many user as follower
  // one user as follower can has many user as followee
  // many to many relations
  User.belongsToMany(User, {
    as: "Followees",
    foreignKey: "follower_id",
    // otherKey: "user_id",
    through: "follows",
  });
  User.belongsToMany(User, {
    as: "Followers",
    foreignKey: "followee_id",
    // otherKey: "user_id",
    through: "follows",
  });

  // User.belongsToMany(User, {
  //   as: "Followee",
  //   foreignKey: "user_id",
  //   otherKey: "followee_id",
  //   through: "follows",
  // });
  // User.belongsToMany(User, {
  //   as: "Follower",
  //   foreignKey: "user_id",
  //   through: "follows",
  //   otherKey: "follower_id",
  // });

  // one user as giver can have many comments
  // one comment belongs to one user as giver
  // one to many relations
  User.hasMany(Comment, { foreignKey: "user_id" });
  Comment.belongsTo(User, { foreignKey: "user_id" });

  // one user have many posts
  // one post belongs to one user
  // one to many relations
  User.hasMany(Post, { foreignKey: "user_id" });
  Post.belongsTo(User, { foreignKey: "user_id" });

  // one user as giver can have many likes
  //one like belongs to one user
  // one to many relations
  User.hasMany(Like, { as: "giver", foreignKey: "giver_id" });
  Like.belongsTo(User, { foreignKey: "giver_id" });

  // one post have many tags
  // one tag belongs to many post
  // many to many relations
  Post.belongsToMany(Tag, { through: "posts_tags", foreignKey: "tag_id" });
  Tag.belongsToMany(Post, { through: "posts_tags", foreignKey: "post_id" });

  // one post have many comments
  // one comment belongs to one post
  // one to many relations
  Post.hasMany(Comment, { foreignKey: "post_id" });
  Comment.belongsTo(Post, { foreignKey: "post_id" });

  // one post have many likes
  // one like belongs to one post
  // one to many relations
  Post.hasMany(Like, { foreignKey: "post_id" });
  Like.belongsTo(Post, { foreignKey: "post_id" });
};

module.exports = setAssociations;
