const usersModel = require("./users.model");

module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("users_logs", {
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
        },
        users_id: {
            type: DataTypes.INTEGER,
            references: {
                allowNull: false,
                references: {
                    model: usersModel,
                    key: id,
                },
            }
        },
    });
};