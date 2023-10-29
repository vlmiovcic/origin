module.exports = (sequelize, Sequelize, DataTypes) => {
    const registration = sequelize.define("registration", {
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
        name: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        mail: {
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
                registration.hasOne(models.users);
                registration.hasMany(models.address)
            }
        }
    });
    return registration;
};
