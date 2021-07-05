const router = require("express").Router();
const usersController = require("../controllers/usersController");

router
  .get("/", usersController.index, usersController.indexView)
  .get("/new", usersController.new) //TODO where do i use it in UI?
  .post("/create", usersController.create, usersController.redirectView)
  .post("/login", usersController.authenticate, usersController.redirectView)
  .get("/login", usersController.login)
  .get("/:id/edit", usersController.edit)
  .put("/:id/update", usersController.update, usersController.redirectView)
  .delete("/:id/delete", usersController.delete, usersController.redirectView)
  .get("/:id", usersController.show);

module.exports = router;
