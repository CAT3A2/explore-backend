const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
  comment: {
    type: DataTypes.TEXT,
  },
});

module.exports = Comment;
