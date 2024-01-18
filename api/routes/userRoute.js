const { Router } = require("express");

const UserController = require("../controllers/userController");
const authenticated = require("../middleware/authenticated");
const roles = require("../middleware/roles");
const permissions = require("../middleware/permissions");

const router = Router();

router.use(authenticated);

router
  .post("/user", UserController.create)
  .get("/users", UserController.getAll)
  .get("/user/id/:id", UserController.getById)
  .delete("/user/id/:id", UserController.deleteById)
  .put("/user/id/:id", UserController.update);

module.exports = router;
