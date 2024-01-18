const Sequelize = require("sequelize");

const database = require("../models");

const permissionsOfRole = (permissionsList) => {
  return async (req, res, next) => {
    const { userId } = req;

    const user = await database.users.findOne({
      include: [
        {
          model: database,
          roles,
          as: "rolesOfUser",
          attributes: ["id", "name"],
        },
      ],
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send("O usuário informado não foi encontrado em nosso sistema.");
    }

    let rolesIdList = [];

    Object.values(user.usersInRole).map((role) => {
      rolesIdList.push(role.id);
    });

    if (rolesIdList.length == 0) {
      return res(401).send("O usuário não possui acesso a rota requirida.");
    }

    const roles = await database.roles.findAll({
      include: [
        {
          model: database.permissions,
          as: "permissionsOfRole",
          attributes: ["id", "name"],
        },
      ],
      where: {
        id: {
          [Sequelize.Op.in]: rolesIdList,
        },
      },
    });

    let havePermission = false;

    roles.map((role) => {
      havePermission = role.permissionsOfRole
        .map((permission) => permission.name)
        .some((permission) => permissionsList.includes(permission));
    });

    if (!havePermission) {
      return res(401).send("O usuário não possui acesso a rota requirida.");
    }

    return next();
  };
};
