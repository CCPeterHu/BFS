const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentsRouter = require('./routes/comments');
const orderRouter = require('./routes/order');

const flash = require('express-flash');
// session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();


app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
    partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
    extname: ".hbs", //expected file extension for handlebars files
    defaultLayout: "layouts", //default layout for app, general template for all pages in app
    helpers: {
      nonEmptyObj: function(obj){
        // if i have empty object
        return !(obj && obj.constructor === Object && Object.keys(obj).length == 0);
      },
      formateDate: function(dateString){
        return new Date(dateString).toLocaleString('en-US', {
          timeStyle: 'long',
          dateStyle: 'full'
        });
      }
    }, //adding new helpers to handlebars for extra functionality
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const sessionStore = new MySQLStore({}, require('./conf/database'));

app.use(session({
  key: 'herald',
  secret: 'horror_movie',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}));


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("horror_movie"));
app.use(flash());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
  if(req.session.uid){
    res.locals.isLoggedIn = true;
    res.locals.uname = req.session.uname;
    // console.log(res.locals.uname);
  }
  next();
})

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use('/order', orderRouter);


/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
})
  

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
