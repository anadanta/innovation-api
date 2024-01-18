const RoleService = require("../services/roleService");

const roleService = new RoleService();

class RoleController {
  static async getAll(_, res) {
    const roles = await roleService.getAll();

    res.status(200).json(roles);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.getById(id);

      res.status(200).json(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async create(req, res) {
    const { name, description } = req.body;

    try {
      const role = await roleService.create({ name, description });

      res.status(201).send(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await roleService.deleteById(id);

      res.status(200).send({ message: "Cargo deletado com sucesso." });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const role = await roleService.update({
        id,
        name,
        description,
      });

      res.status(200).json(role);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
