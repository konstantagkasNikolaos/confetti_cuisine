const login = require("../models/login.model");

exports.loginForm = (req, res) => {
  res.render("login");
};

exports.Authenticate = (req, res) => {
  const credentials = new login({
    email: req.body.email,
    password: req.body.password,
  });

  login.Authenticate(credentials, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data === undefined) {
        req.flash("error", "user not found");
        res.redirect("login");
      } else {
        req.flash("success", "user authenticate");
        res.redirect("login");
      }
    }
  });
};
