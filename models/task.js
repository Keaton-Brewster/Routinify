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
        },
        belongsTo: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User);
        Task.belongsTo(models.Routine);
    };
    return Task;
};