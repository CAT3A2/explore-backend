const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('like', {});

// Like.sync({ force: true })
//   .then(() => console.log('Like table is created'))
//   .catch(() => console.log('Like table creation is failed'));

module.exports = Like;
