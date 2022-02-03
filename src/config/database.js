//Connect api to Postgres database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl:
      process.env.NODE_ENV !== 'production'
        ? false
        : {
            require: true,
            rejectUnauthorized: false,
          },
  },
});

module.exports = sequelize;
