module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        group: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Group.associate = (models) => {
        Group.belongsTo(models.User, {
            foreignKey: {
                name: 'created by',
                type: DataTypes.UUID
            }
        });
    };
    return Group;
};