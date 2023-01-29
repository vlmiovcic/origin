const dbConfig = require("../db/configdb.json");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.db.name, dbConfig.db.user, dbConfig.db.password, {
    host: dbConfig.db.host,
    dialect: dbConfig.db.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.db.pool.max,
        min: dbConfig.db.pool.min,
        acquire: dbConfig.db.pool.acquire,
        idle: dbConfig.db.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;


db.inquiries = require("./inquiries.model.js")(sequelize, Sequelize, DataTypes);

module.exports = db;
