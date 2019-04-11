const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define("checklists", {
  checklist_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  checklist_item: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  condition_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: "weather_conditions",
      key: "weather_Id"
    }
  }
});
