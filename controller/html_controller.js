const isAuthenticated = require('../config/middleware/auth');
const db = require('../models');
const {
    Op
} = require('sequelize');
// const db = require('../models');

module.exports = (app) => {
    // load home screen

    app.get('/sign_up', (req, res) => {
        res.render('signup', {});
    });

    // login (need middleware before (req, res))
    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/users/home');
        } else {
            res.render('login');
        }
    });

    app.get('/users/home', isAuthenticated, async (req, res) => {
        let userGroups = await db.User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['groupsIds']
        });
        userGroups = JSON.parse(userGroups.dataValues.groupsIds);

        const userGroupsIds = [];
        if (userGroups !== 0) {
            userGroups.forEach(ele => userGroupsIds.push(ele));
        }
        const groupData = await db.Group.findAll({
            where: {
                [Op.and]: {
                    id: userGroupsIds
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
        // console.log(groups);
        res.render('justHome', {
            user: req.user,
            groups: groups
        });
    });

    app.get('/users/home/groups', isAuthenticated, async (req, res) => {
        let userGroups = await db.User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['groupsIds']
        });
        userGroups = JSON.parse(userGroups.dataValues.groupsIds);

        const userGroupsIds = [];
        if (userGroups !== 0) {
            userGroups.forEach(ele => userGroupsIds.push(ele));
        }
        const groupData = await db.Group.findAll({
            where: {
                [Op.and]: {
                    id: userGroupsIds
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
            // console.log(user.groupsIds);
            const userGroups = JSON.parse(user.groupsIds);

            //console.log(userGroups)
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
};