module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        group: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Group.associate = (models) => {
        Group.hasMany(models.User, {
<<<<<<< HEAD
            onDelete: 'cascade',
            foreignKey: 'userId'
=======
            onDelete: 'cascade'
>>>>>>> ad07cfcb9b5054b369b557b2744bae5f12d9b877
        });
    };
    return Group;
};
