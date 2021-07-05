"use strict";

const sql = require("../db");
const bcrypt = require("bcrypt");

const Users = function (user) {
  this.fullName = `${user.firstName} ${user.lastName}`;
  this.email = user.email;
  this.password = user.password;
  this.zipCode = user.zipCode;
};

Users.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

Users.create = (user) => {
  return new Promise((resolve, reject) => {
    let hashUser = user;

    bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        hashUser.password = hash;
        sql.query("INSERT INTO users SET ?", hashUser, (err, res) => {
          if (err) reject(err);
          const result = { ...res, user: user.fullName };
          resolve(result);
        });
      })
      .catch((err) => {
        console.log(`Error in hashing password: ${err.message}`);
      });
  });
};

Users.findById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

Users.update = (id, user) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE users SET fullName = ?, email = ?, password = ?, zipCode = ? WHERE id = ?",
      [user.fullName, user.email, user.password, user.zipCode, id],
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

Users.delete = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

Users.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

Users.passwordComparison = (inputPassword, password) => {
  return bcrypt.compare(inputPassword, password);
};

module.exports = Users;
