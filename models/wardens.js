const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('wardens', {
    warden_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    warden_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    warden_username: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR(60),
      allowNull: false
    },
    warden_contact: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    contractor_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    contractor_email: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    contractor_contact: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    consultant_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    plot_number: {
      type: Sequelize.STRING(20),
      allowNull: true,
      references: {
        model: 'plots',
        key: 'plot_no'
      }
    }
  });
