const { customers } = require("./customers.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const customers_address = sequelize.define("customers_address", {
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
        }
    }, {
        classMethods: {
            associate: function(models) {
                customers_address.belongsTo(models.customers, { foreignKeyConstraint: true });
            }
        }
    });

    return customers_address;
};