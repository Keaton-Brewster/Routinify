const express = require('express');
const session = require('express-session');

const passport = require('./config/passport.js');

const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'the family whiteboard',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
// TODO get these routes working so that we can start really using the app!
// require('./routes/api-routes')(app);
// require('./routes/html-routes')(app);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
});