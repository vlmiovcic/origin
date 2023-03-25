const { customers_address } = require('./customers_address.model');
const {
    inquiries
} = require("./inquiries.model");
const {
    orders
} = require("./orders.model");


module.exports = (sequelize, Sequelize, DataTypes) => {
    let customers = sequelize.define("customers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        phone: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        mail: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
                customers.hasMany(models.customers_address);
                customers.hasMany(models.inquiries);
                customers.hasMany(models.orders);
            }
        }
    });

    return customers;
    });
};