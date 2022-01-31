const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('tag', {
  tag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Tag;
