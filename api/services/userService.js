const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcryptjs");

const database = require("../models");

class UserService {
  async getAll() {
    const users = await database.users.findAll();

    return users;
  }

  async getById(id) {
    const user = await database.users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error(
        "O usuário informado não foi encontrado em nosso sistema."
      );
    }

    return workspace;
  }

  async create(dto) {
    const user = await database.users.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new Error(
        "Já existe um usuário cadastrado com este endereço de email."
      );
    }

    try {
      const passwordHash = await hash(dto.password, 10);

      const newUser = await database.users.create({
        id: uuidv4(),
        name: dto.name,
        email: dto.email,
        password: passwordHash,
      });

      return newUser;
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao criar o usuário.");
    }
  }

  async deleteById(id) {
    await this.getById(id);

    try {
      await database.users.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao deletar o usuário.");
    }
  }

  async update(dto) {
    const user = await this.getById(dto.id);

    try {
      user.name = dto.name;
      user.email = dto.email;
      /** */

      await user.save();

      return await user.reload();
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao editar o usuário.");
    }
  }
}

module.exports = UserService;
