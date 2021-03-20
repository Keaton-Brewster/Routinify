const db = require('../models');

// routes for when there's not a user logged in
module.exports = function(app) {
    
    // load home screen
    app.get('/', (req, res) => {
        
    })

    // create new user (need middleware before (req, res) to check for existing user)
    app.post('/api/signup', (req, res) => {

    })

    // login (need middleware before (req, res))
    app.post('/api/login', (req, res) => {

    })


}