module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
    });
    Group.associate = (models) => {
        Group.belongsToMany = (models.User, {
            through: models.User_group
        });

    };
    return Group;
};