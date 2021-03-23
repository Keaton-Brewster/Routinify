const isAuthenticated = require('../config/middleware/auth');
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

    app.get('/users/home', isAuthenticated, (req, res) => {
        const user = req.user;
        res.render('homepage', {
            user: user
        });
        // const user = {
        //     user: await db.User.findOne({
        //         where: {
        //             id: req.params.userID
        //         }
        //     })
        // };
        // res.render('homepage', {
        //     user: user
        // });
    });
};