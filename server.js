const express = require('express');
const session = require('express-session');

const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();
app.use(express.urlencoded({
  extended: true
}));


app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`, PORT, PORT);
  });
});