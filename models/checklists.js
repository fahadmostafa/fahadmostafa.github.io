/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checklists', {
    checklist_item: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    condition_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'weather_conditions',
        key: 'weather_Id'
      }
    }
  }, {
    tableName: 'checklists'
  });
};
