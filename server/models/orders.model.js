const customersModel = require("./customers.model");
const usersModel = require("./users.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("orders", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        customers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: customersModel,
                key: id,
            },
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: usersModel,
                key: id,
            },
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
    });
};