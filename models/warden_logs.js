const Sequelize = require('sequelize');
const db = require("../database/db");

module.exports = db.sequelize.define('warden_logs', {
    log_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'warning_logs',
        key: 'log_id'
      }
    },
    warden_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'wardens',
        key: 'warden_id'
      }
    }
  });

