module.exports = (sequelize, DataTypes) => {
    const User_group = sequelize.define('User_group', {
        name: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return User_group;
};