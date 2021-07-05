const subscribersController = require("../controllers/subscribersController");
const router = require("express").Router();

router
  .get("/", subscribersController.index, subscribersController.indexView)
  .get("/new", subscribersController.new) //TODO where do i use it in UI?
  .post(
    "/create",
    subscribersController.create,
    subscribersController.redirectView
  )
  .get("/:id/edit", subscribersController.edit)
  .put(
    "/:id/update",
    subscribersController.update,
    subscribersController.redirectView
  )
  .delete(
    "/:id/delete",
    subscribersController.delete,
    subscribersController.redirectView
  )
  .get("/:id", subscribersController.show, subscribersController.showView);

module.exports = router;
