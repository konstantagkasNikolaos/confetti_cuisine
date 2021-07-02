"use strict";

//Import tools
const methodOverride = require("method-override");
const express = require("express");
const router = express.Router();
const layouts = require("express-ejs-layouts");
const app = express();
const connectFlash = require("connect-flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
//Import controllers
const homeController = require("./controllers/HomeController");
const errorController = require("./controllers/ErrorController");
const coursesController = require("./controllers/coursesController");
const loginController = require("./controllers/loginController");
const usersController = require("./controllers/usersController");
const subscribersController = require("./controllers/subscribersController");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router
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

router
  .get("/", homeController.index)
  .get("/contact", homeController.getSubscriptionPage)

  .get("/users", usersController.index, usersController.indexView)
  .get("/users/new", usersController.new) //TODO where do i use it in UI?
  .post("/users/create", usersController.create, usersController.redirectView)
  .get("/users/:id/edit", usersController.edit)
  .put(
    "/users/:id/update",
    usersController.update,
    usersController.redirectView
  )
  .delete(
    "/users/:id/delete",
    usersController.delete,
    usersController.redirectView
  )
  .get("/users/:id", usersController.show)

  .get(
    "/subscribers",
    subscribersController.index,
    subscribersController.indexView
  )
  .get("/subscribers/new", subscribersController.new) //TODO where do i use it in UI?
  .post(
    "/subscribers/create",
    subscribersController.create,
    subscribersController.redirectView
  )
  .get("/subscribers/:id/edit", subscribersController.edit)
  .put(
    "/subscribers/:id/update",
    subscribersController.update,
    subscribersController.redirectView
  )
  .delete(
    "/subscribers/:id/delete",
    subscribersController.delete,
    subscribersController.redirectView
  )
  .get(
    "/subscribers/:id",
    subscribersController.show,
    subscribersController.showView
  )

  .get("/courses", coursesController.index, coursesController.indexView)
  .get("/courses/new", coursesController.new)
  .post(
    "/courses/create",
    coursesController.create,
    coursesController.redirectView
  )
  .get("/courses/:id/edit", coursesController.edit)
  .put(
    "/courses/:id/update",
    coursesController.update,
    coursesController.redirectView
  )
  .delete(
    "/courses/:id/delete",
    coursesController.delete,
    coursesController.redirectView
  )
  .get("/courses/:id", coursesController.show, coursesController.showView)

  //TODO where is it used?
  //router.post("/subscribe", subscribersController.saveSubscriber);

  .get("/login", loginController.loginForm)
  .post("/login", loginController.Authenticate)

  .use(errorController.logErrors)
  .use(errorController.respondNoResourceFound)
  .use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
