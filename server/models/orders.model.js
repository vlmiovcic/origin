module.exports = (sequelize, Sequelize, DataTypes) => {
    const orders = sequelize.define("orders", {
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
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
    }, {
        classMethods: {
            associate: function(models) {
                orders.belongsTo(models.customers, { foreignKeyConstraint: true });
                orders.belongsTo(models.users, { foreignKeyConstraint: true });
                orders.hasMany(models.orders_products);
            }
        }
    });

    return orders;
};