const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('plots', {
    plot_no: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true
    }
});
