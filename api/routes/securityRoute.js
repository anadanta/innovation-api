const { Router } = require("express");

const SecurityController = require("../controllers/securityController");
const roles = require("../middleware/roles");
const permissions = require("../middleware/permissions");

const router = Router();

router.post("/security/acl", SecurityController.createAcl);
router.post("/security/privileges", SecurityController.createPrivileges);

module.exports = router;
