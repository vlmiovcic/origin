const { customers } = require('./customers.model');
module.exports = (sequelize, Sequelize, DataTypes) => {
    const inquiries = sequelize.define("inquiries", {
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
    }, {
        classMethods: {
            associate: function(models) {
                inquiries.belongsTo(models.customers, { foreignKeyConstraint: true });
            }
        }
    });
    return inquiries;
};