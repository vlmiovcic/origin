const { orders } = require('./orders.model');
const {
    users_logs
} = require('./users_logs.model');
module.exports = (sequelize, Sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
                users.hasMany(models.orders);
                users.hasMany(models.users_logs);
            }
        }
    });
    return users;
};