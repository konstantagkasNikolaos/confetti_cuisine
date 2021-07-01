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
const subscriptionController = require("./controllers/subscriptionController");
const coursesController = require("./controllers/coursesController");
const loginController = require("./controllers/loginController");
const usersController = require("./controllers/usersController");

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

  .get("/courses", coursesController.showCourses)
  .get("/courses/new", coursesController.newCourse)
  .post("/courses/create", coursesController.createCourse)
  .get("/courses/:id", coursesController.showCourseDetails)
  .get("/courses/:id/edit", coursesController.editCourse)
  .put("/courses/:id/update", coursesController.updateCourse)
  .delete("/courses/:id/delete", coursesController.deleteCourse)
  .post("/subscriber", subscriptionController.create)
  .get("/users", subscriptionController.getAllSubscribers)
  .get("/login", loginController.loginForm)
  .post("/login", loginController.Authenticate)
  .use(errorController.pageNotFoundError)
  .use(errorController.internalServerError);

app.use("/", router);
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
