const db = require('../models');
const passport = require('../config/passport');

module.exports = (app) => {
    app.post('/api/sign_up', (req, res) => {
        console.log(req.body);
        db.User.create(req.body).then((dbRes) => {
            console.log(dbRes);
            res.redirect(200, '/');
        });
    });

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // got the simple bit of authentication working. You have to already have an account to 'sign in'
        // now just have to figure out what we want thing to look like after we sign in?
        res.end();
    });
};