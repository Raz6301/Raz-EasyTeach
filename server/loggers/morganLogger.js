const morgan = require("morgan");
const chalk = require("chalk");
const { morganTime, morganDay } = require("../utils/timeService");
const { createFile } = require("./fileService");

const errorsFolder = `${__dirname}/errors`;

const morganLogger = morgan((tokens, req, res) => {
  const morganString = [
    morganTime(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "MS",
  ].join(" ");

  if (tokens.status(req, res) >= 400) {
    createFile(morganDay(), `${morganString}\n`);
    return chalk.redBright(morganString);
  }
  return chalk.cyanBright(morganString);
});

module.exports = morganLogger;
