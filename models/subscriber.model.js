const sql = require("../db");

//constructor thelei upoxrewtika to function gia na to thewrisei constructror
const subscribers = function (subs) {
  this.id = subs.id;
  this.name = subs.name;
  this.email = subs.email;
  this.zipcode = subs.zipcode;
};

subscribers.getAll = (result) => {
  sql.query("SELECT * FROM subscriptionschema", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

subscribers.create = (newSubscriber, result) => {
  sql.query(
    "INSERT INTO subscriptionschema SET ?",
    newSubscriber,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      console.log("created customer:", { id: res.insertId, ...newSubscriber });
      result(null, { id: res.insertId, ...newSubscriber });
    }
  );
};

module.exports = subscribers;
