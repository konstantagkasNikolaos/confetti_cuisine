"use strict";
const subscribers = require("../models/subscriber.model");

exports.getAllSubscribers = (req, res) => {
  subscribers.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.render("subscribers", { subscribers: data });
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "content can't be empty" });
  }

  const subscriber = new subscribers({
    name: req.body.name,
    email: req.body.email,
    zipcode: req.body.zipCode,
  });

  subscribers.create(subscriber, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else {
      res.render("thanks");
      console.log(data);
    }
  });
};
