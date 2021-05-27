const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");
const { updateSchema } = require("../validations/userValidation");
const { generateToken } = require("./jwtService");

exports.signup = async (userDetails) => {
  if (!userDetails.password || !userDetails.email) {
    throw new Error("You must provide email and password");
  }
  userDetails.password = await encryptPassword(userDetails.password);
  await userRepository.insertUser(userDetails);
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error("You must provide email and password");
  }

  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new Error("Not found user");

  const encryptedPassword = await encryptPassword(password);

  if (user.password !== encryptedPassword) {
    throw new Error("Your password is incorrect");
  }

  const token = generateToken(user.id, user.email, user.role);

  return token;
};

exports.getProfile = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  return user.toJSON();
};

exports.getAllProfiles = async () => {
  return await userRepository.findAllUsers();
};

exports.editProfile = async (id, userDetails) => {
  const validation = await updateSchema.validateAsync(userDetails);
  if (validation.password) {
    validation.password = await encryptPassword(validation.password);
  }
  await userRepository.updateUser(id, validation);
};
