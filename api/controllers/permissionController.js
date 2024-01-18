const PermissionService = require("../services/permissionService");

const permissionService = new PermissionService();

class PermissionController {
  static async getAll(_, res) {
    const permissions = await permissionService.getAll();

    res.status(200).json(permissions);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const permission = await permissionService.getById(id);

      res.status(200).json(permission);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async create(req, res) {
    const { name, description } = req.body;

    try {
      const permission = await permissionService.create({ name, description });

      res.status(201).send(permission);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await permissionService.deleteById(id);

      res.status(200).send({ message: "Permissão deletada com sucesso." });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const permission = await permissionService.update({
        id,
        name,
        description,
      });

      res.status(200).json(permission);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissionController;
