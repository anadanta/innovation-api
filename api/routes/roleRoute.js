const { Router } = require("express");

const RoleController = require("../controllers/roleController");
const roles = require("../middleware/roles");
const permissions = require("../middleware/permissions");

const router = Router();

router
  .post("/role", RoleController.create)
  .get("/roles", RoleController.getAll)
  .get("/role/id/:id", RoleController.getById)
  .delete("/role/id/:id", RoleController.deleteById)
  .put("/role/id/:id", RoleController.update);

module.exports = router;
