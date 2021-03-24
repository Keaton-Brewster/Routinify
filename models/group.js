module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
    });
    Group.associate = (models) => {
        // Group.hasMany(models.Routine, {
        //     foreignKey: {
        //         name: 'routine',
        //         type: DataTypes.STRING
        //     }
        // });
        Group.belongsTo(models.User, {
            as: 'OwnedBy',
            foreignKey: 'ownerId',
            targetKey: 'id'
        });
        //* added this
        //* trying to figure out how to assign belongs to many to associate all of the members of the group 
 
        // Group.belongsToMany(models.User, {
        //     as: 'GroupUsersId',
        //     through: 'UsersId',
        //     foreignKey: 'UsersId',
        //     targetKey: 'id'
        // });
    };
    return Group;
};