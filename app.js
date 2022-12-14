require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const compression = require("compression");
const helmet = require("helmet");

const indexRouter = require("./routes/index");

const app = express();

//mongoDB

const mongoDb = process.env.MONGODB;
mongoose.connect(mongoDb).then(() => console.log("Connected to DB"));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

require("./config/passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoDb }),
    cookie: {
      maxAge: 30000 * 60 * 60 * 24, // 30 days
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
