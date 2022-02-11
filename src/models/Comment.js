const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// class Comment extends Sequelize.model

const Comment = sequelize.define("comment", {
  comment: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
    require: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    require: true,
  },
});

module.exports = Comment;
