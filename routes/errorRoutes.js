const router = require("express").Router();
const errorController = require("../controllers/ErrorController");

router
  .use(errorController.logErrors)
  .use(errorController.respondNoResourceFound)
  .use(errorController.respondInternalError)
  .use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
  });
module.exports = router;
