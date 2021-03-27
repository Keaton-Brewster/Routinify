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
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Task, {
            sourceKey: 'id',
            foreignKey: 'username'
        });


        User.belongsToMany(models.Group, {
            through: 'Users_groups',
            foreignKey: 'userId'
        });
    };
       
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });


    return User;
};