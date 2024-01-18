const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const database = require("../models");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    const user = await database.users.findOne({
      attributes: ["id", "email", "password"],
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new Error(
        "O email informado ainda não está cadastrado em nosso sistema."
      );
    }

    const passwordMatch = await compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new Error("Enderço de email ou senha inválidos.");
    }

    const accessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 3600,
      }
    );

    return { accessToken };
  }
}

module.exports = AuthService;
