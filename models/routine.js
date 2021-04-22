module.exports = (sequelize, DataTypes) => {
    const Routine = sequelize.define('Routine', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Routine.associate = (models) => {
        Routine.hasMany(models.Task);
        Routine.belongsTo(models.User);
    };
    return Routine;
};