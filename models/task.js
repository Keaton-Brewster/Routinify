module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },    
    });
    Task.associate = (models) => {
<<<<<<< HEAD
=======
        // Task.hasOne(models.Group, {onDelete: 'cascade'});
>>>>>>> ad07cfcb9b5054b369b557b2744bae5f12d9b877
        Task.belongsToMany(models.Routine, {
            through: 'routines',
            onDelete: 'cascade'
        });
        Task.belongsToMany(models.User, {
            through: 'users',
            onDelete: 'cascade'
        });
    };
    
    return Task;
};