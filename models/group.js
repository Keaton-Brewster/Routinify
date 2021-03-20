module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
        group: {
            type: DataTypes.STRING,
            allowNull: false
        }  
    });
    Group.associate = (models) => {
        Group.hasMany(models.User, {onDelete: 'cascade'});
    };
    return Group;
};