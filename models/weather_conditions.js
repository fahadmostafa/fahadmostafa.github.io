/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weather_conditions', {
    weather_Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    condition_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'weather_conditions'
  });
};
