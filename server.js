// This is where our code will go!

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
});