const { Router } = require("express");

const PermissionController = require("../controllers/permissionController");
const roles = require("../middleware/roles");
const permissions = require("../middleware/permissions");

const router = Router();

router
  .post("/permission", PermissionController.create)
  .get("/permissions", PermissionController.getAll)
  .get("/permission/id/:id", PermissionController.getById)
  .delete("/permission/id/:id", PermissionController.deleteById)
  .put("/permission/id/:id", PermissionController.update);

module.exports = router;
