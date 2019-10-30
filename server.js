// Node/Express server
var express = require("express");
var session = require("express-session");
// var cookieParser = require('cookie-parser');
// var MemoryStore = require('session-memory-store')(session);
var passport = require("./config/passport");
// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static directory
app.use('/public', express.static('./public'));
// We need to use sessions to keep track of our user's login status
// app.use(cookieParser());


app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Routes // ========================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  // const server = app.listen(PORT, 'localhost', () => {
  //   // console.log("App listening on PORT " + PORT);
  //   const host = server.address().address;
  //   const port = server.address().port;

  //   console.log(`Example app listening at http://${host}:${port}`);
  // });
  app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
});