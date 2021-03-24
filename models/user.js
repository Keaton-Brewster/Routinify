const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        groupsIds: {
            type: DataTypes.TEXT,
            defaultValue: '0'
        }
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = (models) => {
        //* moved this to group as a belongsToMany
        // User.hasMany(models.Group, {
        //     as: 'Groups',
        //     foreignKey: 'groupsIds',
        //     targetKey: 'id'
        // });
        // User.hasMany(models.Routine, {
        //     onDelete: 'cascade'
        // });
        // User.hasMany(models.Task, {
        //     onDelete: 'cascade'
        // });
    };

    return User;
};