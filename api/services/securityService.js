const Sequelize = require("sequelize");

const database = require("../models");

class securityService {
  async createAcl(dto) {
    const user = await database.users.findOne({
      include: [
        {
          model: database.roles,
          as: "rolesOfUser",
          attributes: ["id", "name", "description"],
        },
        {
          model: database.permissions,
          as: "permissionsOfUser",
          attributes: ["id", "name", "description"],
        },
      ],
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new Error(
        "O usuário informado não foi encontrado em nosso sistema."
      );
    }

    const registeredRoles = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const registeredPermissions = await database.permissions.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissions,
        },
      },
    });

    await user.removeRolesOfUser(user.rolesOfUser);
    await user.removePermissionsOfUser(user.permissionsOfUser);

    await user.addRolesOfUser(registeredRoles);
    await user.addPermissionsOfUser(registeredPermissions);

    const newUser = await database.users.findOne({
      include: [
        {
          model: database.roles,
          as: "rolesOfUser",
          attributes: ["id", "name", "description"],
        },
        {
          model: database.permissions,
          as: "permissionsOfUser",
          attributes: ["id", "name", "description"],
        },
      ],
    });

    return newUser;
  }

  async createPrivileges(dto) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissions,
          as: "permissionsOfRole",
          attributes: ["id", "name", "description"],
        },
      ],
    });

    if (!role) {
      throw new Error("O cargo informado não foi encontrado em nosso sistema.");
    }

    const registeredPermissions = await database.permissions.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissions,
        },
      },
    });

    await role.removePermissionsOfRole(role.permissionsOfRole);

    await role.addPermissionsOfRole(registeredPermissions);

    const newRole = await database.roles.findOne({
      include: [
        {
          model: database.permissions,
          as: "permissionsOfRole",
          attributes: ["id", "name", "description"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });

    return newRole;
  }
}

module.exports = securityService;
