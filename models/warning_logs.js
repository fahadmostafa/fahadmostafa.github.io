const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('warning_logs', {
    log_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    warden_identity: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'wardens',
        key: 'warden_id'
      }
    },
    plot_no: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    feedback_rec_time: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    warning_date: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });
