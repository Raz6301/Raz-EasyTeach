const { mkdir, writeFile, appendFile } = require("fs/promises");
const FS = require("fs");
const chalk = require("chalk");

const createFile = async (day, morganString) => {
  try {
    const URL = `${__dirname}/logs`;
    const DAY = `${URL}/${day}.log`;

    let isExists = FS.existsSync(URL);
    if (!isExists) await mkdir(URL);

    const isFileExists = FS.existsSync(DAY);
    if (!isFileExists) await writeFile(DAY, morganString);
    else await appendFile(DAY, morganString);
  } catch (error) {
    console.log(chalk.redBright(`Create File Error: ${error.message}`));
  }
};

exports.createFile = createFile;
