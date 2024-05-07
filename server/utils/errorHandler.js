const chalk = require("chalk");

const handleError = (res, status = 404, message = "Page not Found") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

// module.exports = handleError;
exports.handleError = handleError;
