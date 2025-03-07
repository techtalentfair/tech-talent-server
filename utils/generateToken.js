const jwt = require("jsonwebtoken");

const generateToken = async (payload, expiresIn) => {

  const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });

  return token;
};


module.exports = generateToken;