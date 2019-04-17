const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define("selected_checklists", {
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
  warning_type: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  warning_date: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});
