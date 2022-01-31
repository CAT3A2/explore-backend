const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please input correct format of email',
      },
      notNull: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // setter method, hash user password before save to db. db only store hashed password.
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    },
  },
  avatar: {
    type: DataTypes.STRING,
  },
});

User.sync({ force: true })
  .then(() => console.log('User table is created'))
  .catch((err) => console.log('Something wrong with User table creation'));

module.exports = User;

