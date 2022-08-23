module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userId: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER(11)
        },

        name: {
            allowNull: false,
            unique: false,
            type: DataTypes.STRING
        },

        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
        },

        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
    })

    return User;
}