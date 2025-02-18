const { validateToken } = require("../services/jwtService");

const tokenValidation = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.slice(7);
    const { id, email, role } = validateToken(token);
    //adds attribute use, an object with email and role
    req.user = { id, email, role };
  }
  next();
};
module.exports = tokenValidation;
