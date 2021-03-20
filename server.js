const express = require('express');

const port = process.env.PORT || 8080
var db = require("./models");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

//routes

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log(`Listening on port ${port}.`, PORT, PORT);
    });
  });
  