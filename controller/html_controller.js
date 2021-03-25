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
        res.render('homepage', {
            user: req.user,
            groups: groups
        });
    });
    
    app.get('/users/home/groups/:id', isAuthenticated, async (req, res) => {
        let groupData;
        const users = await db.User.findAll({
            attributes: ['groupsIds']
        });
        const usersArr = JSON.parse(users.dataValues.groupsIds);
        console.log(users);
        usersArr.forEach(async (groupId) => {
            if (groupId === req.params.id) {
                groupData = await db.Group.findAll({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        model: db.User,
                    }
                });
            }
        });
        console.log(groupData);
        res.render('group_page', {
            group: groupData[0].dataValues,
            users: groupData[0].dataValues
        });

    });
    // app.get('/users/home/groups/:id', isAuthenticated, (req, res) => {
    //     db.Group.findAll({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(groupData => {
    //         res.render('group_page', {
    //             group: groupData[0].dataValues
    //         });
    //     });
    // });
};