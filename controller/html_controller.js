const isAuthenticated = require('../config/middleware/auth');
const db = require('../models');
const {
    Op
} = require('sequelize');


module.exports = (app) => {
    app.get('/sign_up', (req, res) => {
        res.render('signup', {});
    });

    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/users/home');
        } else {
            res.render('login', {});
        }
    });

    app.get('/users/home', isAuthenticated, async (req, res) => {
        let userGroups = await db.User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['groupsIds']
        });
        userGroups = userGroups.groupsIds;

        let groups = await db.Group.findAll({
            where: {
                [Op.and]: {
                    id: userGroups
                }
            }
        });
        groups = groups.map(group => group.dataValues);
        groups.forEach(group => {
            if (group.ownerId === req.user.id) {
                group.ownerLoggedIn = true;
            }
        });

        res.render('yourGroups', {
            user: req.user,
            groups: groups,
        });
    });

    app.get('/users/:id/routines', isAuthenticated, async (req, res) => {
        const userRoutines = await db.Routine.findAll({
            where: {
                UserId: req.params.id
            }
        });
        const userTasks = await db.Task.findAll({
            where: {
                UserId: req.params.id
            }
        });

        res.render('my_routines', {
            user: req.user,
            routines: userRoutines,
            userTasks: userTasks
        });
    });

    app.get('/users/home/groups/:id', isAuthenticated, async (req, res) => {
        const usersInGroup = [];
        const usersNOTInGroup = [];
        const allUsers = await db.User.findAll({});
        let group = await db.Group.findOne({
            where: {
                id: req.params.id
            }
        });
        group = group.dataValues;
        const thisGroupId = parseInt(req.params.id);
        let owner = await db.User.findOne({
            where: {
                id: group.ownerId
            }
        });
        owner = owner.dataValues;


        allUsers.forEach((user) => {
            const userGroups = user.groupsIds;

            if (userGroups.includes(thisGroupId)) {
                if (req.user.id === owner.id && req.user.id !== user.dataValues.id) {
                    user.canBeDeleted = true;
                }
                usersInGroup.push(user);
            } else {
                usersNOTInGroup.push(user);
            }
        });

        res.render('group_page', {
            owner: owner,
            group: group,
            usersNOTInGroup: usersNOTInGroup,
            usersInGroup: usersInGroup,

        });
    });

    app.get('/users/home/groups/:groupId/tasks', isAuthenticated, async (req, res) => {
        const usersInGroup = [];
        const allUsers = await db.User.findAll({});
        const thisGroupId = parseInt(req.params.groupId);

        let groupTasks = await db.Task.findAll({
            where: {
                belongsTo: req.params.groupId
            }
        });

        groupTasks = groupTasks.map(ele => ele.dataValues);

        let group = await db.Group.findOne({
            where: {
                id: req.params.groupId
            }
        });

        allUsers.forEach((user) => {
            const userGroups = user.groupsIds;
            if (userGroups.includes(thisGroupId)) {
                usersInGroup.push(user);  
            } else {
                console.log(`${user.username} is not in ${group.name}`);
            }
        });
        
        group = group.dataValues;

        res.render('group_tasks', {
            group: group,
            tasks: groupTasks,
            groupUsers: usersInGroup
        });
    });
};