module.exports = (app) => {
    app.get('/sign_up', (req, res) => {
        res.render('signup', {});
    });

    app.get('/', (req, res) => {
        res.render('login', {});
    });
};