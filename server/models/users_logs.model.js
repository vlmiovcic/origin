const {
    users
} = require("./users.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const users_logs = sequelize.define("users_logs", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        logout_date: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: null,
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
                users_logs.belongsTo(models.users, { foreignKeyConstraint: true });
            }
        }
    });
    return users_logs;
};