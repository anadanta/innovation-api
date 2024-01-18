const { Router } = require("express");

const WorkspaceController = require("../controllers/workspaceController");
const roles = require("../middleware/roles");
const permissions = require("../middleware/permissions");

const router = Router();

router
  .post("/workspace", WorkspaceController.create)
  .get("/workspaces", WorkspaceController.getAll)
  .get("/workspace/id/:id", WorkspaceController.getById)
  .delete("/workspace/id/:id", WorkspaceController.deleteById)
  .put("/workspace/id/:id", WorkspaceController.update);

module.exports = router;
