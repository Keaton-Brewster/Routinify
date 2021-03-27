module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            length: 'tiny',
            allowNull: true
        }
    });
    Task.associate = (models) => {
        Task.belongsToMany(models.User, {
            through: 'UserTasks',
            onDelete: 'cascade'
        });

        Task.belongsToMany(models.Routine, {
            through: 'TaskRoutines',
            onDelete: 'cascade'
        });
    };
    
    return Task;
};