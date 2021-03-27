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
        Group.hasOne(models.User, {
            as: 'OwnedBy',
            foreignKey: 'ownerId',
            targetKey: 'id'
        });
        Group.belongsToMany = (models.User, {
            through: 'User_groups',
            foreignKey: 'groupId'
        });

    };
    return Group;
};