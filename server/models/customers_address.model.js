const customersModel = require("./customers.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("customers_address", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        street: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        customers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: customersModel,
                key: id,
            },
        },
    });
};