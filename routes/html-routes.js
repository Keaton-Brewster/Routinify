const db = require('../models');
const user = require('../models/user');

// routes for when there's not a user logged in
module.exports = function (app) {

    // load home screen
    app.get('/', (req, res) => {

    });

    // create new user (need middleware before (req, res) to check for existing user)
    app.post('/api/signup', async (req, res) => {
        // need value from input.trim() username & hashed password from listeners in public/assets/js
        // if signup is always admin, and users can only be added from admin being logged in, isAdmin =  true
        // need variable for username
        const username = await db.User.create({
            username: 'req.userName',
            email: 'req.email',
            password: 'req.password',
            isAdmin: true,
        });
        console.log('New user ID: ', username.id);
    });

    // login (need middleware before (req, res))
    app.post('/api/login', (req, res) => {

    });


};