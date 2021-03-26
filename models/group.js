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
        Group.belongsTo(models.User, {
            as: 'OwnedBy',
            foreignKey: 'ownerId',
            targetKey: 'id'
        });
    };
    return Group;
};