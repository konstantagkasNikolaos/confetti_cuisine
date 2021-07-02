"use strict";

const Subscriber = require("../models/subscriber.model");

module.exports = {
  index: (req, res, next) => {
    Subscriber.getAllSubscribers()
      .then((subscribers) => {
        res.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("subscribers/index");
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  create: (req, res, next) => {
    const subscriber = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    };
    Subscriber.create(subscriber)
      .then((subscriber) => {
        res.locals.redirect = "/subscribers";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  edit: (req, res, next) => {
    Subscriber.findById(req.params.id)
      .then((subscriber) => {
        res.render("subscribers/edit", {
          subscriber: subscriber[0],
        });
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    const subscriber = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    };

    Subscriber.update(req.params.id, subscriber)
      .then((subscriber) => {
        res.locals.redirect = `/subscribers/${req.params.id}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    Subscriber.findById(req.params.id)
      .then((subscriber) => {
        res.locals.subscriber = subscriber[0];
        next();
      })
      .catch((error) => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  delete: (req, res, next) => {
    Subscriber.delete(req.params.id)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
