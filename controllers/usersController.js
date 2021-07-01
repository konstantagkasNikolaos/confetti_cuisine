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
    res.render("users/index");
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

    Users.create(newUser)
      .then((user) => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(`Error saving user: ${err}`);
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
};
