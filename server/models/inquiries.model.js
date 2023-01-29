module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("inquiries", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mail: {
            type: DataTypes.STRING(90),
            allowNull: false,
            unique: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(185),
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        created: {
            type: DataTypes.DATETIME,
            defaultValue: DataTypes.NOW
        },
        edited: {
            type: DataTypes.DATETIME,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};
