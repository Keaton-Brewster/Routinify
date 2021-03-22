const isAuthenticated = require('../config/middleware/auth');

module.exports = (app) => {


    // load home screen

    app.get('/sign_up', (req, res) => {
        res.render('signup', {});
    });


    //* I moved this into the api_controller and set it up to work with the public js -KEATON
    // create new user (need middleware before (req, res) to check for existing user)
    // app.post('/api/signup', async (req, res) => {
    // need value from input.trim() username & hashed password from listeners in public/assets/js
    // if signup is always admin, and users can only be added from admin being logged in, isAdmin =  true
    // need variable for username
    //     const username = await db.User.create({
    //         username: 'req.userName',
    //         email: 'req.email',
    //         password: 'req.password',
    //         isAdmin: true,
    //     });
    //     console.log('New user ID: ', username.id);
    // });

    // login (need middleware before (req, res))
    app.get('/', (req, res) => {
        if (req.user) {
            res.render('homepage', {});
        }
        res.render('login', {});
    });

    app.get('/users/home', isAuthenticated, (req, res) => {
        res.render('homepage', {});
    });
};