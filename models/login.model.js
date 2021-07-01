const sql = require("../db");
const bcrypt = require("bcrypt");

const login = function (credentials) {
  this.email = credentials.email;
  this.password = credentials.password;
};

login.Authenticate = (credentials, result) => {
  sql.query(
    "SELECT id FROM users WHERE email=? AND password=?",
    [credentials.email, credentials.password],
    (err, res) => {
      if (err) {
        console.log(err);
        result(null, err);
        return;
      }
      let pass = "123";
      bcrypt
        .hash(pass, 10)
        .then((hash) => {
          pass = hash;
          console.log(pass);
        })
        .catch((error) => {
          console.log("error hashing:" + error);
        });
      console.log(pass);

      result(null, res[0]);
    }
  );
};

module.exports = login;
