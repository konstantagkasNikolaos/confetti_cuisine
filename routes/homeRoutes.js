const router = require("express").Router();
const homeController = require("../controllers/HomeController");

router
  .get("/", homeController.index)
  .get("/contact", homeController.getSubscriptionPage);

module.exports = router;
