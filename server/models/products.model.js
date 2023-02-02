module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
    });
};
