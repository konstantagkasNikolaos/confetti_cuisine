const sql = require("../db");

const subscribers = function (subs) {
  this.id = subs.id;
  this.name = subs.name;
  this.email = subs.email;
  this.zipCode = subs.zipCode;
};

subscribers.getAllSubscribers = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM subscribers", (err, subscribers) => {
      if (err) reject(err);
      resolve(subscribers);
    });
  });
};

subscribers.create = (subscriber) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO subscribers SET ?", subscriber, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

subscribers.findById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM subscribers WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

subscribers.update = (id, subscriber) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE subscribers SET name = ?, email = ?, zipCode = ? WHERE id = ?",
      [subscriber.name, subscriber.email, subscriber.zipCode, id],
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

subscribers.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM subscribers WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = subscribers;
