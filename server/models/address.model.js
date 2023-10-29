const { customers } = require("./customers.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const address = sequelize.define("address", {
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
                address.belongsTo(models.customers, { foreignKeyConstraint: true });
                address.belongsTo(models.registration, {foreignKeyConstraint: true});
            }
        }
    });

    return address;
};
