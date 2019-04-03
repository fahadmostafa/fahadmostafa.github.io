/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plots', {
    plot_no: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'plots'
  });
};
