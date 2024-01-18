const { verify, decode } = require("jsonwebtoken");

const jsonSecret = require("../config/jsonSecret");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .send(
        "Hum... Parece que não conseguimos localizar o seu token de acesso. Que tal tentar novamente?"
      );
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, jsonSecret.secret);

    const { id, email } = await decode(accessToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    res.status(401).send("Ops! Usuário não autorizado.");
  }
};
