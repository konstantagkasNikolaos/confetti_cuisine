const coursesController = require("../controllers/coursesController");
const router = require("express").Router();

router
  .get("/", coursesController.index, coursesController.indexView)
  .get("/new", coursesController.new)
  .post("/create", coursesController.create, coursesController.redirectView)
  .get("/:id/edit", coursesController.edit)
  .put("/:id/update", coursesController.update, coursesController.redirectView)
  .delete(
    "/:id/delete",
    coursesController.delete,
    coursesController.redirectView
  )
  .get("/:id", coursesController.show, coursesController.showView);

module.exports = router;
