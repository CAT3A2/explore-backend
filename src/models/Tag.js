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

// Tag.sync({force: true}).then(()=>console.log('Tag table is created')).catch((err)=>console.log('Something wrong with Tag table creation'))

module.exports = Tag;
