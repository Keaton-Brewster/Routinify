const isAuthenticated = require('../config/middleware/auth');
const db = require('../models');
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
        const groupData = await db.Group.findAll({
            where: {
                ownerId: req.user.id
            }
        });
        const groups = [];
        for (let i = 0; i < groupData.length; i++) {
            groups.push(groupData[i].dataValues);
        }
        // console.log(groups);
        res.render('homepage', {
            user: req.user,
            groups: groups
        });
    });

    app.get('/users/home/groups/:id', isAuthenticated, (req, res) => {
        db.Group.findAll({
            where: {
                id: req.params.id
            }
        }).then(groupData => {
            res.render('group_page', {
                group: groupData[0].dataValues
            });
        });
    });
};