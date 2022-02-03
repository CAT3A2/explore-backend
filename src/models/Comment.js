const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('comment', {
  comment: {
    type: DataTypes.TEXT,
  },
});

// Comment.sync({ force: true })
//   .then(() => console.log('Comment table is created'))
//   .catch((err) => console.log('Comment table creation failed'));

module.exports = Comment;
