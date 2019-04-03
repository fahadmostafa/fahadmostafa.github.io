/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warden_logs', {
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
  }, {
    tableName: 'warden_logs'
  });
};
