const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

<<<<<<< HEAD
const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

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
=======
const app = require('express');

const exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var apps = express();

// Serve static content for the apps from the "public" directory in the application directory.
// This is a level of abstraction to hide credentials from user
apps.use(express.static('public'));

// Parse application body as JSON
apps.use(express.urlencoded({
  extended: false
}));
apps.use(express.json());

// the main page is always displayed

apps.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
apps.set("view engine", "handlebars");

// Import routes and give the server access to them.
// Norm is to call it "var = routes"
var routes = require("./controllers.js");

// Use express routes defined
apps.use("/", routes);

// Start our server so that it can begin listening to client requests.
apps.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
>>>>>>> ac94b36be12aa33bda85a1a111333437ab9ba595
});