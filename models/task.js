module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },    
    });
    Task.associate = (models) => {
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