const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class PermissionService {
  async getAll() {
    const permissions = await database.permissions.findAll();

    return permissions;
  }

  async getById(id) {
    const permission = await database.permissions.findOne({
      where: {
        id: id,
      },
    });

    if (!permission) {
      throw new Error(
        "A permissão informada não foi encontrado em nosso sistema."
      );
    }

    return permission;
  }

  async create(dto) {
    const permission = await database.permissions.findOne({
      where: {
        name: dto.name,
      },
    });

    if (permission) {
      throw new Error("Já existe uma permissão cadastrada com este nome.");
    }

    try {
      const newPermission = await database.permissions.create({
        id: uuidv4(),
        name: dto.name,
        description: dto.description,
      });

      return newPermission;
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao criar a permissão.");
    }
  }

  async deleteById(id) {
    await this.getById(id);

    try {
      await database.permissions.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao deletar a permissão.");
    }
  }

  async update(dto) {
    const permission = await this.getById(dto.id);

    try {
      permission.name = dto.name;
      permission.description = dto.description;

      await permission.save();

      return await permission.reload();
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao editar a permissão.");
    }
  }
}

module.exports = PermissionService;
