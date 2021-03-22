const path = require('path');

module.exports = (app) => {
    // Index route loads login page
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
    // singup route loads static signup page
    app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, '../public/signup.html')));
};