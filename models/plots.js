const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('plots', {
    plot_no: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
});
