const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class RoleService {
  async getAll() {
    const roles = await database.roles.findAll();

    return roles;
  }

  async getById(id) {
    const role = await database.roles.findOne({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error("O cargo informado não foi encontrado em nosso sistema.");
    }

    return role;
  }

  async create(dto) {
    const role = await database.roles.findOne({
      where: {
        name: dto.name,
      },
    });

    if (role) {
      throw new Error("Já existe um cargo cadastrado com este nome.");
    }

    try {
      const newRole = await database.roles.create({
        id: uuidv4(),
        name: dto.name,
        description: dto.description,
      });

      return newRole;
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao criar o cargo.");
    }
  }

  async deleteById(id) {
    await this.getById(id);

    try {
      await database.roles.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao deletar o cargo.");
    }
  }

  async update(dto) {
    const role = await this.getById(dto.id);

    try {
      role.name = dto.name;
      role.description = dto.description;

      await role.save();

      return await role.reload();
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao editar o cargo.");
    }
  }
}

module.exports = RoleService;
