const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('like', {});

module.exports = Like;
