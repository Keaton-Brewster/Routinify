module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Group.associate = (models) => {
        Group.hasMany(models.Routine, {
            foreignKey: {
                name: 'routine',
                type: DataTypes.STRING
            }
        });
    };
    return Group;
};