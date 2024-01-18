const UserService = require("../services/userService");

const userService = new UserService();

class UserController {
  static async getAll(_, res) {
    const users = await userService.getAll();

    res.status(200).json(users);
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);

      res.status(200).json(user);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await userService.create({ name, email, password });

      res.status(201).send(user);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      await userService.deleteById(id);

      res.status(200).send({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await userService.update({
        id,
        name,
        email,
      });

      res.status(200).json(user);
    } catch (error) {
      console.log("Message error: ", error.message);
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserController;
