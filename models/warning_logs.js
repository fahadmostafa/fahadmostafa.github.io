const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('warning_logs', {
    log_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    feedback_ack: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    feedback_rec_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    warning_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
