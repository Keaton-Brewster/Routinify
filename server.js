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


// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}.`, PORT, PORT);
//   });
// });

db.sequelize.sync().then(() => {
  try{
  app.listen(PORT, () => {
<<<<<<< HEAD
      console.log(`Listening on port ${PORT}.`, PORT, PORT);
      });
  } catch(err){
      console.error(`Error at server.js(35): ${err}`);
  }
=======
    console.log('Listening on port', PORT);
  });
>>>>>>> ad07cfcb9b5054b369b557b2744bae5f12d9b877
});