const dbConfig = require("../db/configdb.json");

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.db.name, dbConfig.db.user, dbConfig.db.password, {
    host: dbConfig.db.host,
    dialect: dbConfig.db.dialect,
    operatorsAliases: 0,
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
db.products = require("./products.model.js")(sequelize, Sequelize, DataTypes);
db.customers = require("./customers.model")(sequelize, Sequelize, DataTypes);
db.address = require("./address.model")(sequelize, Sequelize, DataTypes);
db.users = require("./users.model")(sequelize, Sequelize, DataTypes);
db.registration = require("./registration.model")(sequelize, Sequelize, DataTypes);
db.orders = require("./orders.model")(sequelize, Sequelize, DataTypes);
db.users_logs = require("./users_logs.model")(sequelize, Sequelize, DataTypes);
db.orders_products = require("./orders_products.model")(sequelize, DataTypes);
const CLASSMETHODS = 'classMethods';
const ASSOCIATE = 'associate';
const fs = require('fs');
const path = require('path');
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize, DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName] !== undefined &&
        db[modelName].options !== undefined &&
        CLASSMETHODS in db[modelName].options) {
        if (ASSOCIATE in db[modelName].options[CLASSMETHODS]) {
            db[modelName].options.classMethods.associate(db);
        }
    }
});


db.sequelize.sync()
    .then(() => {
        console.log('Synced db.');
    })
    .catch((error) => {
        console.error('Sync error: ', error.message);
    });

module.exports = db;
