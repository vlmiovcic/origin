const {
    orders
} = require("./orders.model");
const products = require('./products.model');

module.exports = (sequelize, DataTypes) => {
    const orders_products = sequelize.define("orders_products", {
        products_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },        ,
        orders_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: function(models) {
                orders_products.belongsTo(models.orders, { foreignKeyConstraint: true });
                orders_products.belongsTo(models.products, { foreignKeyConstraint: true });
            }
        }
    });

    return orders_products;
};