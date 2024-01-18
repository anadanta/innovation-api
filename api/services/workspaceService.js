const { v4: uuidv4 } = require("uuid");

const database = require("../models");

class WorkspaceService {
  async getAll() {
    const workspaces = await database.workspaces.findAll();

    return workspaces;
  }

  async getById(id) {
    const workspace = await database.workspaces.findOne({
      where: {
        id: id,
      },
    });

    if (!workspace) {
      throw new Error(
        "O workspace informado não foi encontrado em nosso sistema."
      );
    }

    return workspace;
  }

  async create(dto) {
    const workspace = await database.workspaces.findOne({
      where: {
        name: dto.name,
      },
    });

    if (workspace) {
      throw new Error("Workspace já está cadastrado.");
    }

    try {
      const newWorkspace = await database.workspaces.create({
        id: uuidv4(),
        name: dto.name,
        imageUrl: dto.imageUrl,
        description: dto.description,
        cep: dto.cep,
        state: dto.state,
        city: dto.city,
        neighborhood: dto.neighborhood,
        avenue: dto.avenue,
      });

      return newWorkspace;
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao criar o workspace.");
    }
  }

  async deleteById(id) {
    await this.getById(id);

    try {
      await database.workspaces.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao deletar o workspace.");
    }
  }

  async update(dto) {
    const workspace = await this.getById(dto.id);

    try {
      workspace.name = dto.name;
      workspace.imageUrl = dto.imageUrl;
      workspace.description = dto.description;
      workspace.cep = dto.cep;
      workspace.state = dto.state;
      workspace.city = dto.city;
      workspace.neighborhood = dto.neighborhood;
      workspace.avenue = dto.avenu;

      await workspace.save();

      return await workspace.reload();
    } catch (error) {
      throw new Error("Ops! Ocorreu um erro ao editar o workspace.");
    }
  }
}

module.exports = WorkspaceService;
