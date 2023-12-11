//Require the dotenv module to load enviroment variables
require('dotenv').config();

//Require the sequelize module
const Sequelize = require('sequelize');
//Create a new instance of Sequelize and connect to the database using JAWSDB_URL enviroment variables if available , otherwise use the DB_NAME, DB_USER, and DB_PASSWORD enviroment variables to connec to a local mySQL database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
