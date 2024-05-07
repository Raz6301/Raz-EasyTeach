const bcrypt = require("bcryptjs");

const generatePassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (passwordFromClient, passwordFromDB) =>
  bcrypt.compareSync(passwordFromClient, passwordFromDB);

exports.generatePassword = generatePassword;
exports.comparePassword = comparePassword;
