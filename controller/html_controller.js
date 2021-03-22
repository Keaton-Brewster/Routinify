module.exports = (app) => {
    app.get('/sign_up', (req, res) => {
        res.render('sign_up', {});
    });

    app.get('/', (req, res) => {
        res.render('login', {});
    });
};