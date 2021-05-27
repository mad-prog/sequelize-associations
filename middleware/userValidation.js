const HttpError = require("../utils/httpError");

const userValidation = (req, res, next) => {
  //optional chaining operator
  //option 1
  //   if (req.user?.role !== "user" || req.user?.role !== "admin")
  //     throw new HttpError(401);
  if (!["user", "admin"].includes(req.user?.role)) throw new HttpError(401);
  next();
};

module.exports = userValidation;
