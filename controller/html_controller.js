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


        res.render('justHome', {
            user: req.user,
        });
    });

    app.get('/users/home/groups', isAuthenticated, async (req, res) => {
        let userGroups = await db.User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['groupsIds']
        });
        userGroups = userGroups.groupsIds;

        const groupData = await db.Group.findAll({
            where: {
                [Op.and]: {
                    id: userGroups
                }
            }
        });
        let groups = [];
        if (groupData.length > 0) {
            for (let i = 0; i < groupData.length; i++) {
                groups.push(groupData[i].dataValues);
            }
        } else {
            groups = 'no groups found';
        }
        res.render('yourGroups', {
            user: req.user,
            groups: groups
        });
    });

    app.get('/users/home/groups/:id', isAuthenticated, async (req, res) => {
        const usersInGroup = [];
        const usersNOTInGroup = [];
        const allUsers = await db.User.findAll({});
        const group = await db.Group.findOne({
            where: {
                id: req.params.id
            }
        });
        const thisGroupId = parseInt(req.params.id);

        allUsers.forEach((user) => {
            const userGroups = user.groupsIds;

            if (userGroups.includes(thisGroupId)) {
                usersInGroup.push(user);
            } else {
                usersNOTInGroup.push(user);
            }
        });

        res.render('group_page', {
            group: group.dataValues,
            usersNOTInGroup: usersNOTInGroup,
            usersInGroup: usersInGroup
        });
    });

    app.get('/users/home/groups/:groupId/tasks', isAuthenticated, async (req, res) => {
        let groupTasks = await db.Task.findAll({
            where: {
                belongsTo: req.params.groupId
            }
        });

        groupTasks = groupTasks.map(ele => ele.dataValues);

        res.render('group_tasks', {
            tasks: groupTasks
        });
    });
};