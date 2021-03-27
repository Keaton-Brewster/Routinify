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
            allowNull: false
        }
    });
    return Task;
};