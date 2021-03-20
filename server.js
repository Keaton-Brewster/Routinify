const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080
var db = require("./models");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

//routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}.`, PORT, PORT);
  });
});