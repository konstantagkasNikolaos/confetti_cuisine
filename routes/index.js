"use strict";

const router = require("express").Router();
const usersRoutes = require("./usersRoutes");
const subscribersRoutes = require("./subscribersRoutes");
const coursesRoutes = require("./coursesRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/users", usersRoutes);
router.use("/subscribers", subscribersRoutes);
router.use("/courses", coursesRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
