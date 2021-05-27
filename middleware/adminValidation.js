const HttpError = require("../utils/httpError");

const adminValidation = (req, res, next) => {
  if (req.user?.role !== "admin") throw new HttpError(401);
  next();
};

module.exports = adminValidation;
