const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('admins', {
    admin_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    admin_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    admin_username: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR(60),
      allowNull: false
    }
  });
