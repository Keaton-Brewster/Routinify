module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            length: 'tiny'
        }
    });
    Task.associate = (models) => {
        Task.belongsToMany(models.User, {
            through: 'UserTasks',
            onDelete: 'cascade'
        });
    };
    
    return Task;
};