"use strict";

const Users = require("../models/users.model");
const users = require("../models/users.model");

module.exports = {
  index: (req, res, next) => {
    users
      .getAllUsers()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching users: ${err}`);
        next(err);
      });
  },

  indexView: (req, res) => {
    if (req.query.format === "json") {
      res.json(res.locals.users);
    } else {
      res.render("users/index");
    }
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    const newUser = new users({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
    });

    //TODO if email exists error
    Users.create(newUser)
      .then((response) => {
        req.flash(
          "success",
          `${response.user}'s account created successfully!`
        );
        res.locals.redirect = "/users";
        res.locals.user = response;
        next();
      })
      .catch((err) => {
        console.log(`Error saving user: ${err}`);
        req.flash(
          "error",
          `Failed to create user account beacause :${err.message}`
        );
        next(err);
      });
  },

  redirectView: (req, res) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  edit: (req, res, next) => {
    Users.findById(req.params.id)
      .then((user) => {
        const splitName = user[0].fullName.split(" ");
        const transformUser = {
          id: user[0].id,
          name: { first: splitName[0], last: splitName[1] },
          email: user[0].email,
          zipCode: user[0].zipCode,
        };
        res.render("users/edit", { user: transformUser });
      })
      .catch((err) => {
        console.log(`Error fetching user by ID: ${err}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    const updateUser = new users({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
    });
    Users.update(req.params.id, updateUser)
      .then((user) => {
        res.locals.redirect = `/users/${req.params.id}`;
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(`Error updating user by ID: ${err}`);
        next(err);
      });
  },

  show: (req, res, next) => {
    Users.findById(req.params.id)
      .then((user) => {
        res.render("users/show", { user: user[0] });
      })
      .catch((err) => {
        console.log(`Error fetching user by ID: ${err}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    Users.delete(req.params.id)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((err) => {
        console.log(`Error deleting user by ID: ${err.message}`);
        next();
      });
  },

  login: (req, res) => {
    res.render("users/login");
  },

  authenticate: (req, res, next) => {
    Users.findByEmail(req.body.email)
      .then((user) => {
        user = user[0];
        Users.passwordComparison(req.body.password, user.password).then(
          (comparison) => {
            if (comparison) {
              res.locals.redirect = `/users/${user.id}`;
              req.flash(
                "success",
                `${user.fullName}'s logged in successfully!`
              );
              res.locals.user = user;
              next();
            } else {
              req.flash(
                "error",
                "Your account or password is incorrect.Please try again or contact your system administrator!"
              );
              res.locals.redirect = "/users/login";
              next();
            }
          }
        );
      })
      .catch((error) => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
  },
};
