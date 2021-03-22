const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

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
// app.use(passport.initialize());
// app.use(passport.session());

//set up handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//routes
// require('./controller/api_controller')(app);
// require('./controller/html_controller')(app);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
});