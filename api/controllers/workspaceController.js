const WorkspaceService = require("../services/workspaceService");

const workspaceService = new WorkspaceService();

class WorkspaceController {
  static async getAll(_, res) {
    const workspaces = await workspaceService.getAll();

    res.status(200).json(workspaces);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const workspace = await workspaceService.getById(id);

      res.status(200).json(workspace);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async create(req, res) {
    const {
      name,
      imageUrl,
      description,
      cep,
      state,
      city,
      neighborhhod,
      avenue,
    } = req.body;

    try {
      const workspace = await workspaceService.create({
        name,
        imageUrl,
        description,
        cep,
        state,
        city,
        neighborhhod,
        avenue,
      });

      res.status(201).json(workspace);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await workspaceService.deleteById(id);

      res.status(200).send({ message: "Workspace deletado com sucesso." });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const {
      name,
      imageUrl,
      description,
      cep,
      state,
      city,
      neighborhhod,
      avenue,
    } = req.body;

    try {
      const workspace = await workspaceService.update({
        id,
        name,
        imageUrl,
        description,
        cep,
        state,
        city,
        neighborhhod,
        avenue,
      });

      res.status(200).json(workspace);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = WorkspaceController;
