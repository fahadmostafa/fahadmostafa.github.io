const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('weather_conditions', {
    weather_Id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    condition_name: {
      type: Sequelize.TEXT,
      allowNull: false
    }
});
