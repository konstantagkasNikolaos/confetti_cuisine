"use strict";

const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "confetti_cuisine",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to confetti_cuisine database.");
});

module.exports = connection;
