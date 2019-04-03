/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warning_logs', {
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
  }, {
    tableName: 'warning_logs'
  });
};
