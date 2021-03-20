module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    // User.associate = (models) => {
    //     User.belongsTo(models.Group, {onDelete: 'cascade'});
    //     User.hasMany(models.Routine, {onDelete: 'cascade'});
    //     User.hasMany(models.Task, {onDelete: 'cascade'}); 
    // };
    
    return User;
};