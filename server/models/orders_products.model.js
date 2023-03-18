const ordersModel = require("./orders.model");
const productsModel = require("./products.model");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("orders_products", {
        products_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: productsModel,
                key: id,
            },
        },
        orders_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ordersModel,
                key: id,
            },
        },
    });
};