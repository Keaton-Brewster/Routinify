const db = require('../models');

module.exports = (app) => {
    app.post('/api/sign_up', (req, res) => {
        console.log(req.body);
        db.User.create(req.body).then((dbRes) => {
            console.log(dbRes);
            res.redirect(200, '/');
        });
    });

    app.post('api/login')
};