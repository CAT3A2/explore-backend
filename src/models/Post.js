const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Tag = require("./Tag");

const Post = sequelize.define("post", {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    require: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  destination: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
