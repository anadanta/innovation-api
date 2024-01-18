const SecurityService = require("../services/securityService");

const securityService = new SecurityService();

class securityController {
  static async createAcl(req, res) {
    const { roles, permissions } = req.body;
    const { userId } = req;

    try {
      const acl = await securityService.createAcl({
        roles,
        permissions,
        userId,
      });

      res.status(201).send(acl);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async createPrivileges(req, res) {
    const { roleId, permissions } = req.body;

    try {
      const privileges = await securityService.createPrivileges({
        roleId,
        permissions,
      });

      res.status(201).send(privileges);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = securityController;
