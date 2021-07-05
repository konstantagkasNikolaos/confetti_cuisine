"use strict";

const methodOverride = require("method-override");
const express = require("express");
const router = require("./routes/index");
const layouts = require("express-ejs-layouts");
const app = express();
const connectFlash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
//Import controllers
const homeController = require("./controllers/HomeController");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app
  .use(
    methodOverride("_method", {
      methods: ["POST", "GET"],
    })
  )
  .use(layouts)
  .use(express.static("public"))
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use(express.json())
  .use(homeController.logRequestPaths)
  .use(cookieParser("secret_passcode"))
  .use(
    expressSession({
      secret: "secret_passcode",
      cookie: {
        maxAge: 4000000,
      },
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(connectFlash())
  .use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
  });

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
