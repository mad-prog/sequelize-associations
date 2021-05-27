const HttpError = require("../utils/httpError");

//funciones de primera orden

const roleValidation = (role) => {
  const roles = Array.isArray(role) ? role : [role];
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role)) throw new HttpError(401);
    next();
  };
};

/*
//spread operator lets it support arrays of various roles
const roleValidation = (role) => {
  return (req, res, next) => {
    if (![...role, "admin"].reeq.user?.role) throw new HttpError(401);
    next();
  };
};
*/
module.exports = roleValidation;
