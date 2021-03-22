module.exports = (sequelize, DataTypes) => {
    const Routine = sequelize.define('Routine', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Routine.associate = (models) => {
        Routine.belongsToMany(models.User, {
            through: 'UserRoutines',
            onDelete: 'cascade'
        });
        Routine.hasMany(models.Task, {onDelete: 'cascade'});
    };
    
    return Routine;
};