const Sequelize = require("sequelize");
const db = {}
const sequelize = new Sequelize("iqcyly3uehp6y3sm", "oqphwv4y13dmwc2q", "j54bu4ujh3izf6yr", {
    host: 'gi6kn64hu98hy0b6.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    freezeTableName: true,
    operatorsAliases: false,


    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;